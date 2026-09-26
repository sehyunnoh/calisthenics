import type { Difficulty } from '../data/exercises'
import { EXERCISES } from '../data/exercises'
import type { DayRoutine } from '../data/routines'
import type { Locale } from '../i18n/locale'
import { setProgressLabel, UI } from '../i18n/ui'

export type StepKind = 'warmup' | 'work' | 'rest' | 'cooldown'

export interface TimerStep {
  kind: StepKind
  seconds: number
  title: string
  exerciseId?: string
}

export function buildSteps(routine: DayRoutine, difficulty: Difficulty, locale: Locale): TimerStep[] {
  const steps: TimerStep[] = []

  if (routine.warmupSeconds > 0) {
    steps.push({ kind: 'warmup', seconds: routine.warmupSeconds, title: UI.kind.warmup[locale] })
  }

  routine.exercises.forEach((ref, exerciseIndex) => {
    const exercise = EXERCISES[ref.exerciseId]
    const displayName = exercise.variants[difficulty][locale]
    for (let set = 1; set <= ref.sets; set++) {
      steps.push({
        kind: 'work',
        seconds: ref.workSeconds,
        title: ref.sets > 1 ? setProgressLabel(locale, displayName, set, ref.sets) : displayName,
        exerciseId: ref.exerciseId,
      })

      const isLastSetOfLastExercise =
        exerciseIndex === routine.exercises.length - 1 && set === ref.sets
      if (!isLastSetOfLastExercise && ref.restSeconds > 0) {
        steps.push({ kind: 'rest', seconds: ref.restSeconds, title: UI.kind.rest[locale] })
      }
    }
  })

  if (routine.cooldownSeconds > 0) {
    steps.push({ kind: 'cooldown', seconds: routine.cooldownSeconds, title: UI.kind.cooldown[locale] })
  }

  return steps
}
