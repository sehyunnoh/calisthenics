import { addDays, todayKey } from '../lib/date'

interface RecordProps {
  completions: string[]
  streak: number
}

const WEEKS_TO_SHOW = 6
const DAYS = WEEKS_TO_SHOW * 7

export default function Record({ completions, streak }: RecordProps) {
  const completedSet = new Set(completions)
  const today = new Date()
  const cells = Array.from({ length: DAYS }, (_, i) => {
    const date = addDays(today, -(DAYS - 1 - i))
    const key = todayKey(date)
    return { key, date, done: completedSet.has(key) }
  })

  return (
    <div className="page">
      <p className="eyebrow">나의 기록</p>
      <h1 className="page-title">{streak > 0 ? `${streak}일 연속 운동 중 🔥` : '오늘부터 시작해봐요'}</h1>
      <p className="record-total">총 완료 {completions.length}일</p>

      <div className="heatmap">
        {cells.map((cell) => (
          <div key={cell.key} className={`heatmap-cell${cell.done ? ' done' : ''}`} title={cell.key} />
        ))}
      </div>
      <p className="heatmap-caption">최근 {WEEKS_TO_SHOW}주</p>
    </div>
  )
}
