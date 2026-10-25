import { todayKey } from './date'
import { isTodayCompleted } from './storage'

/**
 * Daily workout reminders via Web Push. A Cloudflare Worker (see /worker) wakes this device's
 * service worker every hour from 18:00 to 21:59 until today is marked completed.
 */
export const REMINDER_START_HOUR = 18
export const REMINDER_END_HOUR = 22

const API_URL = (import.meta.env.VITE_PUSH_API_URL as string | undefined)?.replace(/\/+$/, '')
const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY as string | undefined

export type PermissionState = NotificationPermission | 'unsupported'
export type EnableResult = PermissionState | 'error'

export function isReminderWindow(now: Date = new Date()): boolean {
  const hour = now.getHours()
  return hour >= REMINDER_START_HOUR && hour < REMINDER_END_HOUR
}

export function getPermission(): PermissionState {
  const supported =
    Boolean(API_URL && VAPID_PUBLIC_KEY) &&
    typeof Notification !== 'undefined' &&
    'serviceWorker' in navigator &&
    'PushManager' in window
  return supported ? Notification.permission : 'unsupported'
}

function urlBase64ToUint8Array(base64Url: string): Uint8Array<ArrayBuffer> {
  const padded = base64Url.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(base64Url.length / 4) * 4, '=')
  const binary = atob(padded)
  return Uint8Array.from(binary, (c) => c.charCodeAt(0))
}

async function post(path: string, body: unknown): Promise<void> {
  const response = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!response.ok) throw new Error(`${path} failed: ${response.status}`)
}

async function getRegistration(): Promise<ServiceWorkerRegistration> {
  await navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`)
  return navigator.serviceWorker.ready
}

/** Registers (or refreshes) this device on the push server, including whether today is already done. */
async function registerWithServer(subscription: PushSubscription): Promise<void> {
  await post('/subscribe', {
    subscription: subscription.toJSON(),
    tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
    date: todayKey(),
    done: isTodayCompleted(),
  })
}

/** Asks for notification permission, subscribes to push, and registers with the server. */
export async function enableReminder(): Promise<EnableResult> {
  if (getPermission() === 'unsupported') return 'unsupported'
  try {
    const permission = await Notification.requestPermission()
    if (permission !== 'granted') return permission
    const registration = await getRegistration()
    const subscription =
      (await registration.pushManager.getSubscription()) ??
      (await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY!),
      }))
    await registerWithServer(subscription)
    return 'granted'
  } catch {
    return 'error'
  }
}

export async function disableReminder(): Promise<void> {
  try {
    const registration = await navigator.serviceWorker.getRegistration()
    const subscription = await registration?.pushManager.getSubscription()
    if (!subscription) return
    await post('/unsubscribe', { endpoint: subscription.endpoint })
    await subscription.unsubscribe()
  } catch {
    // Offline or server unreachable - the server drops dead subscriptions on its own.
  }
}

/** Called on app start while reminders are enabled, to keep the server's copy fresh. */
export async function refreshReminder(): Promise<void> {
  if (getPermission() !== 'granted') return
  try {
    const subscription = await (await getRegistration()).pushManager.getSubscription()
    if (subscription) await registerWithServer(subscription)
  } catch {
    // Retried on the next app start.
  }
}

/** Tells the server whether today is done so it stops (or resumes) sending reminders. */
export async function syncCompletion(done: boolean): Promise<void> {
  if (getPermission() !== 'granted') return
  try {
    const subscription = await (await navigator.serviceWorker.getRegistration())?.pushManager.getSubscription()
    if (subscription) await post('/status', { endpoint: subscription.endpoint, date: todayKey(), done })
  } catch {
    // Retried by refreshReminder() on the next app start.
  }
}

/** Logs today's completion to the Discord channel via the worker (deduplicated server-side). */
export async function reportCompletion(): Promise<void> {
  if (!API_URL) return
  try {
    await post('/complete', { date: todayKey() })
  } catch {
    // Retried on the next app start while today is still completed.
  }
}
