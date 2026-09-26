import type { Difficulty } from '../data/exercises'
import { EXERCISES } from '../data/exercises'
import type { DayRoutine } from '../data/routines'
import { useLocale } from '../i18n/locale'
import { exerciseMetaLabel, streakLabel, UI } from '../i18n/ui'

interface HomeProps {
  routine: DayRoutine
  difficulty: Difficulty
  completedToday: boolean
  streak: number
  onStart: () => void
}

export default function Home({ routine, difficulty, completedToday, streak, onStart }: HomeProps) {
  const { locale, t } = useLocale()

  return (
    <div className="page">
      <p className="eyebrow">{t(UI.home.eyebrow)}</p>
      <h1 className="page-title">{t(routine.label)}</h1>

      {streak > 0 && <p className="streak-pill">{streakLabel(locale, streak)}</p>}

      <ul className="exercise-preview">
        {routine.exercises.map((ref) => {
          const exercise = EXERCISES[ref.exerciseId]
          return (
            <li key={ref.exerciseId}>
              <span className="exercise-name">{exercise.variants[difficulty][locale]}</span>
              <span className="exercise-meta">{exerciseMetaLabel(locale, ref.sets, ref.workSeconds, ref.restSeconds)}</span>
            </li>
          )
        })}
      </ul>

      <button className="primary-button" onClick={onStart}>
        {completedToday ? t(UI.home.restart) : t(UI.home.start)}
      </button>

      {completedToday && <p className="done-note">{t(UI.home.doneNote)}</p>}
    </div>
  )
}
