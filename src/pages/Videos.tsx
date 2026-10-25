import { useEffect, useState, type SubmitEvent } from 'react'
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
import {
  formatSyncCode,
  generateSyncCode,
  getSyncCode,
  isSyncAvailable,
  normalizeSyncCode,
  pushAddedVideo,
  pushRemovedVideo,
  setSyncCode,
  syncVideos,
} from '../lib/videoSync'

export default function Videos() {
  const { t } = useLocale()
  const [videos, setVideos] = useState(() => getSavedVideos())
  const [link, setLink] = useState('')
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [playing, setPlaying] = useState<SavedVideo | null>(null)
  const [syncCode, setSyncCodeState] = useState(() => getSyncCode())
  const [codeInput, setCodeInput] = useState('')
  const [syncError, setSyncError] = useState<'failed' | 'invalidCode' | null>(null)

  useEffect(() => {
    if (!syncCode) return
    syncVideos(syncCode)
      .then((synced) => {
        setVideos(synced)
        setSyncError(null)
      })
      .catch(() => setSyncError('failed'))
  }, [syncCode])

  function reportSyncFailure() {
    setSyncError('failed')
  }

  function enableSync(code: string) {
    setSyncCode(code)
    setSyncCodeState(code)
    setCodeInput('')
    setSyncError(null)
  }

  function handleConnect(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const code = normalizeSyncCode(codeInput)
    if (code) enableSync(code)
    else setSyncError('invalidCode')
  }

  function handleSyncOff() {
    setSyncCode(null)
    setSyncCodeState(null)
    setSyncError(null)
  }

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
    const video: SavedVideo = { ...parsed, title: title.trim() || t(UI.videos.untitled), addedAt: Date.now() }
    setVideos(addSavedVideo(video))
    if (syncCode) pushAddedVideo(syncCode, video).catch(reportSyncFailure)
    setLink('')
    setTitle('')
    setMessage(null)
  }

  function handleRemove(video: SavedVideo) {
    if (!window.confirm(t(UI.videos.confirmRemove))) return
    setVideos(removeSavedVideo(video.videoId))
    if (syncCode) pushRemovedVideo(syncCode, video.videoId).catch(reportSyncFailure)
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

      {isSyncAvailable && (
        <section className="video-sync">
          <h2 className="video-sync-title">{t(UI.videos.syncTitle)}</h2>
          {syncCode ? (
            <>
              <p className="video-sync-code">{formatSyncCode(syncCode)}</p>
              <p className="reminder-hint">
                {t(UI.videos.syncActive)} {t(UI.videos.syncWarning)}
              </p>
              <button className="reminder-toggle" onClick={handleSyncOff}>
                {t(UI.videos.syncOff)}
              </button>
            </>
          ) : (
            <>
              <button className="reminder-toggle" onClick={() => enableSync(generateSyncCode())}>
                {t(UI.videos.syncCreate)}
              </button>
              <form className="video-form" onSubmit={handleConnect}>
                <input
                  type="text"
                  placeholder={t(UI.videos.syncCodePlaceholder)}
                  value={codeInput}
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  onChange={(e) => setCodeInput(e.target.value)}
                />
                <button type="submit" className="primary-button">
                  {t(UI.videos.syncConnect)}
                </button>
              </form>
            </>
          )}
          {syncError && (
            <p className="video-form-message">
              {t(syncError === 'failed' ? UI.videos.syncFailed : UI.videos.syncInvalidCode)}
            </p>
          )}
        </section>
      )}

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
