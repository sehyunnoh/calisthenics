import type { Difficulty } from '../data/exercises'

interface SettingsProps {
  difficulty: Difficulty
  onChange: (difficulty: Difficulty) => void
}

const OPTIONS: { value: Difficulty; label: string; hint: string }[] = [
  { value: 'beginner', label: '초급', hint: '운동을 막 시작했거나 관절 부담을 줄이고 싶을 때' },
  { value: 'intermediate', label: '중급', hint: '기본 동작이 편안하게 느껴질 때 (기본값)' },
  { value: 'advanced', label: '고급', hint: '더 강한 자극과 난이도를 원할 때' },
]

export default function Settings({ difficulty, onChange }: SettingsProps) {
  return (
    <div className="page">
      <p className="eyebrow">설정</p>
      <h1 className="page-title">난이도</h1>
      <div className="difficulty-options">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            className={`difficulty-option${difficulty === opt.value ? ' selected' : ''}`}
            onClick={() => onChange(opt.value)}
          >
            <span className="difficulty-label">{opt.label}</span>
            <span className="difficulty-hint">{opt.hint}</span>
          </button>
        ))}
      </div>
      <p className="settings-note">
        모든 기록과 설정은 이 기기의 브라우저에만 저장돼요 (localStorage). 다른 기기나 브라우저에서는
        기록이 공유되지 않아요.
      </p>
    </div>
  )
}
