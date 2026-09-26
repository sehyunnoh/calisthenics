import type { Difficulty, Exercise } from '../data/exercises'
import { CATEGORY_LABEL, exerciseEmbedUrl, exerciseSearchUrl, exerciseWatchUrl } from '../data/exercises'
import { useLocale } from '../i18n/locale'
import { UI } from '../i18n/ui'

interface ExerciseModalProps {
  exercise: Exercise
  difficulty: Difficulty
  onClose: () => void
}

export default function ExerciseModal({ exercise, difficulty, onClose }: ExerciseModalProps) {
  const { locale, t } = useLocale()
  const embedUrl = exerciseEmbedUrl(exercise)
  const name = exercise.variants[difficulty][locale]

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label={t(UI.modal.close)}>
          ✕
        </button>

        <p className="eyebrow">{t(CATEGORY_LABEL[exercise.category])}</p>
        <h2 className="modal-title">{name}</h2>
        <p className="session-cue">{t(exercise.cue)}</p>

        {embedUrl ? (
          <div className="video-embed">
            <iframe
              src={embedUrl}
              title={name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <p className="video-missing">{t(UI.modal.noVideo)}</p>
        )}

        <a
          className="video-link"
          href={exerciseWatchUrl(exercise) ?? exerciseSearchUrl(exercise, difficulty, locale)}
          target="_blank"
          rel="noreferrer"
        >
          {t(UI.modal.openInYoutube)}
        </a>
      </div>
    </div>
  )
}
