const SAVED_VIDEOS_KEY = 'calisthenics.savedVideos.v1'

export interface SavedVideo {
  videoId: string
  title: string
  /** start offset in seconds, from a `t=` / `start=` parameter in the pasted link */
  start: number
  addedAt: number
}

function parseStart(raw: string | null): number {
  if (!raw) return 0
  if (/^\d+$/.test(raw)) return Number(raw)
  const match = raw.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/)
  if (!match) return 0
  return Number(match[1] ?? 0) * 3600 + Number(match[2] ?? 0) * 60 + Number(match[3] ?? 0)
}

/** Extracts the video id (and optional start time) from the usual YouTube link shapes, or null. */
export function parseYoutubeLink(input: string): { videoId: string; start: number } | null {
  let url: URL
  try {
    url = new URL(input.trim())
  } catch {
    return null
  }
  const host = url.hostname.replace(/^(www|m|music)\./, '')
  let videoId: string | null = null
  if (host === 'youtu.be') {
    videoId = url.pathname.slice(1).split('/')[0]
  } else if (host === 'youtube.com') {
    const match = url.pathname.match(/^\/(?:shorts|embed|live)\/([^/?]+)/)
    videoId = url.pathname === '/watch' ? url.searchParams.get('v') : (match?.[1] ?? null)
  }
  if (!videoId || !/^[\w-]{6,20}$/.test(videoId)) return null
  return { videoId, start: parseStart(url.searchParams.get('t') ?? url.searchParams.get('start')) }
}

export function savedVideoEmbedUrl(video: SavedVideo): string {
  const params = new URLSearchParams({ rel: '0' })
  if (video.start > 0) params.set('start', String(video.start))
  return `https://www.youtube.com/embed/${video.videoId}?${params}`
}

export function savedVideoWatchUrl(video: SavedVideo): string {
  const start = video.start > 0 ? `&t=${video.start}s` : ''
  return `https://www.youtube.com/watch?v=${video.videoId}${start}`
}

export function savedVideoThumbnailUrl(video: SavedVideo): string {
  return `https://i.ytimg.com/vi/${video.videoId}/mqdefault.jpg`
}

export function getSavedVideos(): SavedVideo[] {
  try {
    const raw = localStorage.getItem(SAVED_VIDEOS_KEY)
    return raw ? (JSON.parse(raw) as SavedVideo[]) : []
  } catch {
    return []
  }
}

export function writeSavedVideos(videos: SavedVideo[]): void {
  try {
    localStorage.setItem(SAVED_VIDEOS_KEY, JSON.stringify(videos))
  } catch {
    // localStorage unavailable (private mode, quota, etc.) - fail silently
  }
}

/** Adds a video (newest first). Returns the updated list, or the unchanged list if the video is already saved. */
export function addSavedVideo(video: SavedVideo): SavedVideo[] {
  const current = getSavedVideos()
  if (current.some((v) => v.videoId === video.videoId)) return current
  const next = [video, ...current]
  writeSavedVideos(next)
  return next
}

export function removeSavedVideo(videoId: string): SavedVideo[] {
  const next = getSavedVideos().filter((v) => v.videoId !== videoId)
  writeSavedVideos(next)
  return next
}
