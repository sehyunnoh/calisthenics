import { useLocale } from '../i18n/locale'
import { recordTitle, totalCompletedLabel, UI } from '../i18n/ui'
import { addDays, todayKey } from '../lib/date'

interface RecordProps {
  completions: string[]
  streak: number
}

const WEEKS_TO_SHOW = 6
const DAYS = WEEKS_TO_SHOW * 7

export default function Record({ completions, streak }: RecordProps) {
  const { locale, t } = useLocale()
  const completedSet = new Set(completions)
  const today = new Date()
  const cells = Array.from({ length: DAYS }, (_, i) => {
    const date = addDays(today, -(DAYS - 1 - i))
    const key = todayKey(date)
    return { key, date, done: completedSet.has(key) }
  })

  return (
    <div className="page">
      <p className="eyebrow">{t(UI.record.eyebrow)}</p>
      <h1 className="page-title">{recordTitle(locale, streak)}</h1>
      <p className="record-total">{totalCompletedLabel(locale, completions.length)}</p>

      <div className="heatmap">
        {cells.map((cell) => (
          <div key={cell.key} className={`heatmap-cell${cell.done ? ' done' : ''}`} title={cell.key} />
        ))}
      </div>
      <p className="heatmap-caption">{t(UI.record.caption)}</p>
    </div>
  )
}
