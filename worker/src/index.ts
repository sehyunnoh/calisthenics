/**
 * Daily workout reminder push server.
 *
 * - POST /subscribe   { subscription, tz, date?, done? }  register a device (and its completion state)
 * - POST /status      { endpoint, date, done }            record that a day was completed / un-completed
 * - POST /unsubscribe { endpoint }                        remove a device
 * - POST /complete   { date }                            post "workout done" to Discord (once per day)
 * - POST /test       { app? }  (Bearer ADMIN_TOKEN)      push right now to every device of `app`, ignoring time window / completion
 *
 * A cron runs every hour. For each device whose local time is 18:00-21:59 and whose
 * local "today" isn't marked done, it sends an empty Web Push; the service worker shows the notification.
 *
 * Discord log: /complete posts a message right after a workout; the 22:00 (DISCORD_TZ) cron run posts
 * a "not done" message if no completion was reported for that day.
 */

interface Env {
  SUBS: KVNamespace
  VAPID_PUBLIC_KEY: string
  VAPID_PRIVATE_JWK: string
  VAPID_SUBJECT: string
  ALLOWED_ORIGINS: string
  ADMIN_TOKEN?: string
  DISCORD_WEBHOOK_URL?: string
  DISCORD_TZ?: string
}

interface PushSubscriptionJson {
  endpoint: string
}

interface SubRecord {
  endpoint: string
  tz: string
  doneDate?: string
  app?: string
}

const REMINDER_START_HOUR = 18
const REMINDER_END_HOUR = 22
const DISCORD_CHECK_HOUR = 22
const DISCORD_DEFAULT_TZ = 'Asia/Seoul'
const DAY_RECORD_TTL = 3 * 24 * 60 * 60

// Only well-known push services are allowed so the worker can't be used to POST to arbitrary hosts.
const PUSH_HOST_SUFFIXES = ['fcm.googleapis.com', 'push.services.mozilla.com', 'push.apple.com', 'notify.windows.com']

function isAllowedEndpoint(endpoint: string): boolean {
  try {
    const url = new URL(endpoint)
    return url.protocol === 'https:' && PUSH_HOST_SUFFIXES.some((s) => url.hostname === s || url.hostname.endsWith(`.${s}`))
  } catch {
    return false
  }
}

function isValidTimeZone(tz: unknown): tz is string {
  if (typeof tz !== 'string') return false
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: tz })
    return true
  } catch {
    return false
  }
}

function isDateKey(value: unknown): value is string {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)
}

function localDateAndHour(tz: string, now: Date): { date: string; hour: number } {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: tz,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  return { date: `${get('year')}-${get('month')}-${get('day')}`, hour: Number(get('hour')) }
}

async function subKey(endpoint: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(endpoint))
  const hex = Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('')
  return `sub:${hex}`
}

function base64url(bytes: Uint8Array | string): string {
  const data = typeof bytes === 'string' ? new TextEncoder().encode(bytes) : bytes
  let binary = ''
  for (const b of data) binary += String.fromCharCode(b)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

async function vapidAuthHeader(env: Env, endpoint: string): Promise<string> {
  const key = await crypto.subtle.importKey('jwk', JSON.parse(env.VAPID_PRIVATE_JWK), { name: 'ECDSA', namedCurve: 'P-256' }, false, [
    'sign',
  ])
  const header = base64url(JSON.stringify({ typ: 'JWT', alg: 'ES256' }))
  const claims = base64url(
    JSON.stringify({
      aud: new URL(endpoint).origin,
      exp: Math.floor(Date.now() / 1000) + 12 * 60 * 60,
      sub: env.VAPID_SUBJECT,
    }),
  )
  const signature = await crypto.subtle.sign({ name: 'ECDSA', hash: 'SHA-256' }, key, new TextEncoder().encode(`${header}.${claims}`))
  return `vapid t=${header}.${claims}.${base64url(new Uint8Array(signature))}, k=${env.VAPID_PUBLIC_KEY}`
}

/** Sends an empty (payload-less) push. Returns the HTTP status from the push service. */
async function sendPush(env: Env, endpoint: string): Promise<number> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: await vapidAuthHeader(env, endpoint),
      TTL: '3600',
      Urgency: 'normal',
      Topic: 'daily-workout-reminder',
    },
  })
  return response.status
}

function corsHeaders(request: Request, env: Env): Record<string, string> {
  const origin = request.headers.get('Origin') ?? ''
  const allowed = env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
  return {
    'Access-Control-Allow-Origin': allowed.includes(origin) ? origin : allowed[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    Vary: 'Origin',
  }
}

function json(request: Request, env: Env, body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(request, env) },
  })
}

async function readBody(request: Request): Promise<Record<string, unknown> | null> {
  try {
    const body = await request.json()
    return body && typeof body === 'object' ? (body as Record<string, unknown>) : null
  } catch {
    return null
  }
}

async function handleSubscribe(request: Request, env: Env, body: Record<string, unknown>): Promise<Response> {
  const subscription = body.subscription as PushSubscriptionJson | undefined
  const endpoint = subscription?.endpoint
  if (typeof endpoint !== 'string' || !isAllowedEndpoint(endpoint) || !isValidTimeZone(body.tz)) {
    return json(request, env, { error: 'invalid subscription' }, 400)
  }
  const record: SubRecord = { endpoint, tz: body.tz }
  if (typeof body.app === 'string' && /^[\w-]{1,32}$/.test(body.app)) record.app = body.app
  if (body.done === true && isDateKey(body.date)) record.doneDate = body.date
  await env.SUBS.put(await subKey(endpoint), JSON.stringify(record))
  return json(request, env, { ok: true })
}

async function handleStatus(request: Request, env: Env, body: Record<string, unknown>): Promise<Response> {
  if (typeof body.endpoint !== 'string' || !isDateKey(body.date) || typeof body.done !== 'boolean') {
    return json(request, env, { error: 'invalid status' }, 400)
  }
  const key = await subKey(body.endpoint)
  const raw = await env.SUBS.get(key)
  if (!raw) return json(request, env, { error: 'unknown subscription' }, 404)

  const record = JSON.parse(raw) as SubRecord
  if (body.done) {
    record.doneDate = body.date
  } else if (record.doneDate === body.date) {
    delete record.doneDate
  }
  await env.SUBS.put(key, JSON.stringify(record))
  return json(request, env, { ok: true })
}

async function handleUnsubscribe(request: Request, env: Env, body: Record<string, unknown>): Promise<Response> {
  if (typeof body.endpoint !== 'string') return json(request, env, { error: 'invalid endpoint' }, 400)
  await env.SUBS.delete(await subKey(body.endpoint))
  return json(request, env, { ok: true })
}

/** Manual test: pushes immediately to every device registered by `app` (default: legacy records without an app). */
async function handleTest(request: Request, env: Env, body: Record<string, unknown>): Promise<Response> {
  const auth = request.headers.get('Authorization') ?? ''
  if (!env.ADMIN_TOKEN || auth !== `Bearer ${env.ADMIN_TOKEN}`) return json(request, env, { error: 'unauthorized' }, 401)
  const app = typeof body.app === 'string' ? body.app : undefined

  const results: Record<string, number> = {}
  let cursor: string | undefined
  do {
    const page = await env.SUBS.list({ prefix: 'sub:', cursor })
    for (const { name } of page.keys) {
      const raw = await env.SUBS.get(name)
      if (!raw) continue
      const record = JSON.parse(raw) as SubRecord
      if (record.app !== app) continue
      const status = await sendPush(env, record.endpoint)
      if (status === 404 || status === 410) await env.SUBS.delete(name)
      results[name.slice(0, 12)] = status
    }
    cursor = page.list_complete ? undefined : page.cursor
  } while (cursor)
  return json(request, env, { sent: results })
}

async function postDiscord(env: Env, content: string): Promise<void> {
  if (!env.DISCORD_WEBHOOK_URL) return
  const response = await fetch(env.DISCORD_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  })
  if (!response.ok) console.warn(`discord post failed (${response.status})`)
}

/** Posts "done" to Discord once per day; repeated reports for the same date are ignored. */
async function handleComplete(request: Request, env: Env, body: Record<string, unknown>): Promise<Response> {
  const date = body.date
  if (!isDateKey(date)) return json(request, env, { error: 'invalid date' }, 400)

  // Only accept today (in the Discord timezone) +/- 1 day so the endpoint can't be used to spam arbitrary dates.
  const now = new Date()
  const tz = env.DISCORD_TZ ?? DISCORD_DEFAULT_TZ
  const accepted = [-1, 0, 1].map((d) => localDateAndHour(tz, new Date(now.getTime() + d * 24 * 60 * 60 * 1000)).date)
  if (!accepted.includes(date)) return json(request, env, { error: 'date out of range' }, 400)

  const key = `done:${date}`
  if (await env.SUBS.get(key)) return json(request, env, { ok: true, duplicate: true })
  await env.SUBS.put(key, '1', { expirationTtl: DAY_RECORD_TTL })
  await postDiscord(env, `✅ ${date} 오늘 운동 완료!`)
  return json(request, env, { ok: true })
}

/** At DISCORD_CHECK_HOUR local time, posts a "not done" message if no completion was reported today. */
async function checkDailyCompletion(env: Env, now: Date): Promise<void> {
  const { date, hour } = localDateAndHour(env.DISCORD_TZ ?? DISCORD_DEFAULT_TZ, now)
  if (hour !== DISCORD_CHECK_HOUR) return
  if (await env.SUBS.get(`done:${date}`)) return
  await postDiscord(env, `❌ ${date} 밤 ${DISCORD_CHECK_HOUR - 12}시까지 운동 기록이 없어요.`)
}

async function sendDueReminders(env: Env, now: Date): Promise<void> {
  let cursor: string | undefined
  do {
    const page = await env.SUBS.list({ prefix: 'sub:', cursor })
    for (const { name } of page.keys) {
      const raw = await env.SUBS.get(name)
      if (!raw) continue
      const record = JSON.parse(raw) as SubRecord

      const { date, hour } = localDateAndHour(record.tz, now)
      if (hour < REMINDER_START_HOUR || hour >= REMINDER_END_HOUR) continue
      if (record.doneDate === date) continue

      const status = await sendPush(env, record.endpoint)
      // 404/410: the subscription is gone (app uninstalled, permission revoked) - stop pushing to it.
      if (status === 404 || status === 410) await env.SUBS.delete(name)
      else if (status >= 400) console.warn(`push failed (${status}) for ${name}`)
    }
    cursor = page.list_complete ? undefined : page.cursor
  } while (cursor)
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders(request, env) })
    if (request.method !== 'POST') return json(request, env, { error: 'not found' }, 404)

    const body = await readBody(request)
    if (!body) return json(request, env, { error: 'invalid json' }, 400)

    switch (new URL(request.url).pathname) {
      case '/subscribe':
        return handleSubscribe(request, env, body)
      case '/status':
        return handleStatus(request, env, body)
      case '/unsubscribe':
        return handleUnsubscribe(request, env, body)
      case '/complete':
        return handleComplete(request, env, body)
      case '/test':
        return handleTest(request, env, body)
      default:
        return json(request, env, { error: 'not found' }, 404)
    }
  },

  async scheduled(controller: ScheduledController, env: Env): Promise<void> {
    const now = new Date(controller.scheduledTime)
    await Promise.all([sendDueReminders(env, now), checkDailyCompletion(env, now)])
  },
} satisfies ExportedHandler<Env>
