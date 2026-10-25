import { getSavedVideos, writeSavedVideos, type SavedVideo } from './savedVideos'

/**
 * Shares the saved-video list between devices through the push worker. The sync code is the only
 * credential: whoever knows it can read and edit the list, so it is random and never leaves the user's hands.
 */
const SYNC_CODE_KEY = 'calisthenics.videoSyncCode.v1'
const API_URL = (import.meta.env.VITE_PUSH_API_URL as string | undefined)?.replace(/\/+$/, '')
// No look-alike characters (0/o, 1/l) so a code can be read off one screen and typed on another.
const CODE_ALPHABET = 'abcdefghjkmnpqrstuvwxyz23456789'

export const isSyncAvailable = Boolean(API_URL)

export function getSyncCode(): string | null {
  try {
    return localStorage.getItem(SYNC_CODE_KEY)
  } catch {
    return null
  }
}

export function setSyncCode(code: string | null): void {
  try {
    if (code) localStorage.setItem(SYNC_CODE_KEY, code)
    else localStorage.removeItem(SYNC_CODE_KEY)
  } catch {
    // localStorage unavailable - sync just won't persist.
  }
}

export function generateSyncCode(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(12))
  return Array.from(bytes, (b) => CODE_ALPHABET[b % CODE_ALPHABET.length]).join('')
}

/** Accepts "abcd-efgh-jkmn" as typed or pasted; returns the bare 12-character code, or null. */
export function normalizeSyncCode(input: string): string | null {
  const code = input.toLowerCase().replace(/[\s-]/g, '')
  return /^[a-z0-9]{12}$/.test(code) ? code : null
}

export function formatSyncCode(code: string): string {
  return code.match(/.{1,4}/g)?.join('-') ?? code
}

async function request(path: string, body: Record<string, unknown>): Promise<SavedVideo[]> {
  const response = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!response.ok) throw new Error(`${path} failed: ${response.status}`)
  return ((await response.json()) as { videos: SavedVideo[] }).videos
}

/** Uploads local-only videos, then replaces the local list with the server's. Throws when offline. */
export async function syncVideos(code: string): Promise<SavedVideo[]> {
  let merged = await request('/videos/list', { code })
  const known = new Set(merged.map((v) => v.videoId))
  for (const video of getSavedVideos()) {
    if (!known.has(video.videoId)) merged = await request('/videos/add', { code, video })
  }
  writeSavedVideos(merged)
  return merged
}

export async function pushAddedVideo(code: string, video: SavedVideo): Promise<void> {
  await request('/videos/add', { code, video })
}

export async function pushRemovedVideo(code: string, videoId: string): Promise<void> {
  await request('/videos/remove', { code, videoId })
}
