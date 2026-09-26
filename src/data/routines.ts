import type { LocalizedText } from '../i18n/locale'

export interface RoutineExerciseRef {
  exerciseId: string
  workSeconds: number
  restSeconds: number
  sets: number
}

export interface DayRoutine {
  /** 0 = Sunday ... 6 = Saturday, matches Date#getDay() */
  day: number
  label: LocalizedText
  type: 'workout' | 'recovery'
  warmupSeconds: number
  cooldownSeconds: number
  exercises: RoutineExerciseRef[]
}

const WORK = 40
const REST = 20
const SETS = 3

function reps(exerciseId: string): RoutineExerciseRef {
  return { exerciseId, workSeconds: WORK, restSeconds: REST, sets: SETS }
}

export const WEEKLY_ROUTINE: DayRoutine[] = [
  {
    // Sunday
    day: 0,
    label: { ko: '회복 & 모빌리티', en: 'Recovery & Mobility' },
    type: 'recovery',
    warmupSeconds: 0,
    cooldownSeconds: 0,
    exercises: [
      { exerciseId: 'cat_cow_stretch', workSeconds: 40, restSeconds: 10, sets: 1 },
      { exerciseId: 'hip_flexor_stretch', workSeconds: 40, restSeconds: 10, sets: 1 },
      { exerciseId: 'chest_shoulder_stretch', workSeconds: 40, restSeconds: 10, sets: 1 },
      { exerciseId: 'hamstring_stretch', workSeconds: 40, restSeconds: 10, sets: 1 },
      { exerciseId: 'deep_breathing', workSeconds: 60, restSeconds: 0, sets: 1 },
    ],
  },
  {
    // Monday
    day: 1,
    label: { ko: '상체 밀기', en: 'Push (Upper Body)' },
    type: 'workout',
    warmupSeconds: 60,
    cooldownSeconds: 60,
    exercises: [reps('pushup'), reps('pike_pushup'), reps('chair_dip'), reps('plank')],
  },
  {
    // Tuesday
    day: 2,
    label: { ko: '하체', en: 'Lower Body' },
    type: 'workout',
    warmupSeconds: 60,
    cooldownSeconds: 60,
    exercises: [reps('squat'), reps('lunge'), reps('glute_bridge'), reps('wall_sit')],
  },
  {
    // Wednesday
    day: 3,
    label: { ko: '코어 + 유산소', en: 'Core + Cardio' },
    type: 'workout',
    warmupSeconds: 60,
    cooldownSeconds: 60,
    exercises: [reps('mountain_climber'), reps('crunch'), reps('leg_raise'), reps('burpee')],
  },
  {
    // Thursday
    day: 4,
    label: { ko: '상체 당기기', en: 'Pull (Upper Body)' },
    type: 'workout',
    warmupSeconds: 60,
    cooldownSeconds: 60,
    exercises: [reps('superman'), reps('reverse_snow_angel'), reps('bird_dog'), reps('plank')],
  },
  {
    // Friday
    day: 5,
    label: { ko: '하체 & 힙', en: 'Lower Body & Hips' },
    type: 'workout',
    warmupSeconds: 60,
    cooldownSeconds: 60,
    exercises: [reps('bulgarian_split_squat'), reps('side_lunge'), reps('glute_bridge'), reps('sumo_squat')],
  },
  {
    // Saturday
    day: 6,
    label: { ko: '전신 서킷', en: 'Full-Body Circuit' },
    type: 'workout',
    warmupSeconds: 60,
    cooldownSeconds: 60,
    exercises: [reps('burpee'), reps('pushup'), reps('squat'), reps('mountain_climber'), reps('jumping_jack')],
  },
]

export function routineForDay(day: number): DayRoutine {
  const found = WEEKLY_ROUTINE.find((r) => r.day === day)
  if (!found) throw new Error(`no routine for day ${day}`)
  return found
}
