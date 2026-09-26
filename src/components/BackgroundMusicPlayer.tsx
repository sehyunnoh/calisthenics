import { WORKOUT_PLAYLIST_ID } from '../data/music'

interface BackgroundMusicPlayerProps {
  enabled: boolean
}

export default function BackgroundMusicPlayer({ enabled }: BackgroundMusicPlayerProps) {
  if (!enabled) return null

  const src = `https://www.youtube.com/embed/videoseries?list=${WORKOUT_PLAYLIST_ID}&autoplay=1&loop=1`

  return (
    <div className="music-player">
      <iframe src={src} title="Background workout music" allow="autoplay; encrypted-media" />
    </div>
  )
}
