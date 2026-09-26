import type { Difficulty } from '../data/exercises'
import { EXERCISES } from '../data/exercises'
import type { DayRoutine } from '../data/routines'

interface HomeProps {
  routine: DayRoutine
  difficulty: Difficulty
  completedToday: boolean
  streak: number
  onStart: () => void
}

export default function Home({ routine, difficulty, completedToday, streak, onStart }: HomeProps) {
  return (
    <div className="page">
      <p className="eyebrow">오늘의 루틴</p>
      <h1 className="page-title">{routine.label}</h1>

      {streak > 0 && <p className="streak-pill">🔥 {streak}일 연속</p>}

      <ul className="exercise-preview">
        {routine.exercises.map((ref) => {
          const exercise = EXERCISES[ref.exerciseId]
          return (
            <li key={ref.exerciseId}>
              <span className="exercise-name">{exercise.variants[difficulty]}</span>
              <span className="exercise-meta">
                {ref.sets}세트 · {ref.workSeconds}초 / 휴식 {ref.restSeconds}초
              </span>
            </li>
          )
        })}
      </ul>

      <button className="primary-button" onClick={onStart}>
        {completedToday ? '다시 운동하기' : '시작하기'}
      </button>

      {completedToday && <p className="done-note">오늘 운동은 이미 완료했어요. 다시 해도 좋아요 💪</p>}
    </div>
  )
}
