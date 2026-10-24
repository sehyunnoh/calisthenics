import { useState, type SubmitEvent } from 'react'
import { useLocale } from '../i18n/locale'
import { UI } from '../i18n/ui'
import {
  addSavedVideo,
  getSavedVideos,
  parseYoutubeLink,
  removeSavedVideo,
  savedVideoEmbedUrl,
  savedVideoThumbnailUrl,
  savedVideoWatchUrl,
  type SavedVideo,
} from '../lib/savedVideos'

export default function Videos() {
  const { t } = useLocale()
  const [videos, setVideos] = useState(() => getSavedVideos())
  const [link, setLink] = useState('')
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [playing, setPlaying] = useState<SavedVideo | null>(null)

  function handleAdd(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const parsed = parseYoutubeLink(link)
    if (!parsed) {
      setMessage(t(UI.videos.invalidLink))
      return
    }
    if (videos.some((v) => v.videoId === parsed.videoId)) {
      setMessage(t(UI.videos.duplicate))
      return
    }
    setVideos(addSavedVideo({ ...parsed, title: title.trim() || t(UI.videos.untitled), addedAt: Date.now() }))
    setLink('')
    setTitle('')
    setMessage(null)
  }

  function handleRemove(video: SavedVideo) {
    if (window.confirm(t(UI.videos.confirmRemove))) setVideos(removeSavedVideo(video.videoId))
  }

  return (
    <div className="page">
      <p className="eyebrow">{t(UI.videos.eyebrow)}</p>
      <h1 className="page-title">{t(UI.videos.title)}</h1>

      <form className="video-form" onSubmit={handleAdd}>
        <input
          type="url"
          inputMode="url"
          placeholder={t(UI.videos.linkPlaceholder)}
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder={t(UI.videos.titlePlaceholder)}
          value={title}
          maxLength={80}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" className="primary-button">
          {t(UI.videos.add)}
        </button>
        {message && <p className="video-form-message">{message}</p>}
      </form>

      {videos.length === 0 ? (
        <p className="video-empty">{t(UI.videos.empty)}</p>
      ) : (
        <ul className="saved-videos">
          {videos.map((video) => (
            <li key={video.videoId}>
              <button className="saved-video-play" onClick={() => setPlaying(video)}>
                <img src={savedVideoThumbnailUrl(video)} alt="" loading="lazy" />
                <span className="saved-video-title">{video.title}</span>
              </button>
              <button className="saved-video-remove" onClick={() => handleRemove(video)} aria-label={t(UI.videos.remove)}>
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
      <p className="settings-note">{t(UI.videos.note)}</p>

      {playing && (
        <div className="modal-backdrop" onClick={() => setPlaying(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setPlaying(null)} aria-label={t(UI.modal.close)}>
              ✕
            </button>
            <h2 className="modal-title">{playing.title}</h2>
            <div className="video-embed">
              <iframe
                src={savedVideoEmbedUrl(playing)}
                title={playing.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <a className="video-link" href={savedVideoWatchUrl(playing)} target="_blank" rel="noreferrer">
              {t(UI.modal.openInYoutube)}
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
