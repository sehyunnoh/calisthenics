import type { Difficulty } from '../data/exercises'
import { EXERCISES } from '../data/exercises'
import type { DayRoutine } from '../data/routines'

export type StepKind = 'warmup' | 'work' | 'rest' | 'cooldown'

export interface TimerStep {
  kind: StepKind
  seconds: number
  title: string
  exerciseId?: string
}

export function buildSteps(routine: DayRoutine, difficulty: Difficulty): TimerStep[] {
  const steps: TimerStep[] = []

  if (routine.warmupSeconds > 0) {
    steps.push({ kind: 'warmup', seconds: routine.warmupSeconds, title: '웜업' })
  }

  routine.exercises.forEach((ref, exerciseIndex) => {
    const exercise = EXERCISES[ref.exerciseId]
    const displayName = exercise.variants[difficulty]
    for (let set = 1; set <= ref.sets; set++) {
      steps.push({
        kind: 'work',
        seconds: ref.workSeconds,
        title: ref.sets > 1 ? `${displayName} · ${set}/${ref.sets}세트` : displayName,
        exerciseId: ref.exerciseId,
      })

      const isLastSetOfLastExercise =
        exerciseIndex === routine.exercises.length - 1 && set === ref.sets
      if (!isLastSetOfLastExercise && ref.restSeconds > 0) {
        steps.push({ kind: 'rest', seconds: ref.restSeconds, title: '휴식' })
      }
    }
  })

  if (routine.cooldownSeconds > 0) {
    steps.push({ kind: 'cooldown', seconds: routine.cooldownSeconds, title: '쿨다운 스트레칭' })
  }

  return steps
}
