import { useEffect, useMemo, useRef, useState } from 'react'
import type { Difficulty } from '../data/exercises'
import { EXERCISES, exerciseVideoUrl } from '../data/exercises'
import type { DayRoutine } from '../data/routines'
import { buildSteps } from '../lib/timerSteps'

interface WorkoutSessionProps {
  routine: DayRoutine
  difficulty: Difficulty
  onFinish: () => void
  onExit: () => void
}

const KIND_LABEL: Record<string, string> = {
  warmup: '웜업',
  work: '운동',
  rest: '휴식',
  cooldown: '쿨다운',
}

function vibrate(pattern: number | number[]) {
  try {
    navigator.vibrate?.(pattern)
  } catch {
    // vibration not supported - ignore
  }
}

export default function WorkoutSession({ routine, difficulty, onFinish, onExit }: WorkoutSessionProps) {
  const steps = useMemo(() => buildSteps(routine, difficulty), [routine, difficulty])
  const [stepIndex, setStepIndex] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(steps[0]?.seconds ?? 0)
  const [paused, setPaused] = useState(false)
  const wakeLockRef = useRef<{ release: () => void } | null>(null)

  const step = steps[stepIndex]
  const isDone = stepIndex >= steps.length

  useEffect(() => {
    let lock: { release: () => void } | undefined
    const nav = navigator as Navigator & { wakeLock?: { request: (t: 'screen') => Promise<{ release: () => void }> } }
    nav.wakeLock
      ?.request('screen')
      .then((l) => {
        lock = l
        wakeLockRef.current = l
      })
      .catch(() => {
        // wake lock unavailable/denied - ignore, screen may just dim
      })
    return () => {
      lock?.release()
    }
  }, [])

  useEffect(() => {
    if (isDone) {
      onFinish()
    }
  }, [isDone, onFinish])

  useEffect(() => {
    if (paused || isDone) return
    if (secondsLeft <= 0) {
      const next = stepIndex + 1
      vibrate(next >= steps.length ? [200, 100, 200] : 150)
      setStepIndex(next)
      setSecondsLeft(steps[next]?.seconds ?? 0)
      return
    }
    const timeout = setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearTimeout(timeout)
  }, [secondsLeft, paused, isDone, stepIndex, steps])

  if (isDone || !step) return null

  const exercise = step.exerciseId ? EXERCISES[step.exerciseId] : undefined
  const total = step.seconds
  const progress = total > 0 ? 1 - secondsLeft / total : 0

  function skip() {
    const next = stepIndex + 1
    setStepIndex(next)
    setSecondsLeft(steps[next]?.seconds ?? 0)
  }

  return (
    <div className="session">
      <button className="ghost-button session-exit" onClick={onExit}>
        ✕ 종료
      </button>

      <div className={`session-kind kind-${step.kind}`}>{KIND_LABEL[step.kind]}</div>
      <h2 className="session-title">{step.title}</h2>

      {exercise && <p className="session-cue">{exercise.cue}</p>}

      <div className="timer-ring" style={{ '--progress': progress } as React.CSSProperties}>
        <span className="timer-seconds">{secondsLeft}</span>
      </div>

      <div className="session-controls">
        <button className="ghost-button" onClick={() => setPaused((p) => !p)}>
          {paused ? '▶ 계속' : '⏸ 일시정지'}
        </button>
        <button className="ghost-button" onClick={skip}>
          다음 ⏭
        </button>
      </div>

      {exercise && (
        <a
          className="video-link"
          href={exerciseVideoUrl(exercise, difficulty)}
          target="_blank"
          rel="noreferrer"
        >
          ▶ {exercise.variants[difficulty]} 영상 보기
        </a>
      )}

      <p className="session-progress">
        {stepIndex + 1} / {steps.length}
      </p>
    </div>
  )
}
