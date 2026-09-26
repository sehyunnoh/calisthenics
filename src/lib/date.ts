export function todayKey(date: Date = new Date()): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function addDays(date: Date, delta: number): Date {
  const copy = new Date(date)
  copy.setDate(copy.getDate() + delta)
  return copy
}

export const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토']
