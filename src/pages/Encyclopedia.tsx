import type { Difficulty } from '../data/exercises'
import { CATEGORY_LABEL, CATEGORY_ORDER, EXERCISES } from '../data/exercises'
import { useLocale } from '../i18n/locale'
import { UI } from '../i18n/ui'

interface EncyclopediaProps {
  difficulty: Difficulty
  onSelect: (exerciseId: string) => void
}

export default function Encyclopedia({ difficulty, onSelect }: EncyclopediaProps) {
  const { locale, t } = useLocale()
  const exercises = Object.values(EXERCISES)

  return (
    <div className="page">
      <p className="eyebrow">{t(UI.encyclopedia.eyebrow)}</p>
      <h1 className="page-title">{t(UI.encyclopedia.title)}</h1>

      {CATEGORY_ORDER.map((category) => {
        const inCategory = exercises.filter((ex) => ex.category === category)
        if (inCategory.length === 0) return null
        return (
          <section key={category} className="encyclopedia-section">
            <h3 className="encyclopedia-category">{t(CATEGORY_LABEL[category])}</h3>
            <ul className="exercise-preview">
              {inCategory.map((exercise) => (
                <li key={exercise.id} className="exercise-preview-clickable" onClick={() => onSelect(exercise.id)}>
                  <span className="exercise-name">{exercise.variants[difficulty][locale]}</span>
                  <span className="exercise-meta">{exercise.videoId ? '▶' : ''}</span>
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
