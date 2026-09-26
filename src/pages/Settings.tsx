import type { Difficulty } from '../data/exercises'
import type { Locale } from '../i18n/locale'
import { useLocale } from '../i18n/locale'
import { UI } from '../i18n/ui'

interface SettingsProps {
  difficulty: Difficulty
  onChange: (difficulty: Difficulty) => void
}

const DIFFICULTIES: Difficulty[] = ['beginner', 'intermediate', 'advanced']

const LANGUAGES: { value: Locale; label: string }[] = [
  { value: 'ko', label: '한국어' },
  { value: 'en', label: 'English' },
]

export default function Settings({ difficulty, onChange }: SettingsProps) {
  const { locale, setLocale, t } = useLocale()

  return (
    <div className="page">
      <p className="eyebrow">{t(UI.settings.eyebrow)}</p>

      <h1 className="page-title">{t(UI.settings.languageTitle)}</h1>
      <div className="language-options">
        {LANGUAGES.map((opt) => (
          <button
            key={opt.value}
            className={`language-option${locale === opt.value ? ' selected' : ''}`}
            onClick={() => setLocale(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <h1 className="page-title">{t(UI.settings.difficultyTitle)}</h1>
      <div className="difficulty-options">
        {DIFFICULTIES.map((value) => (
          <button
            key={value}
            className={`difficulty-option${difficulty === value ? ' selected' : ''}`}
            onClick={() => onChange(value)}
          >
            <span className="difficulty-label">{t(UI.difficulty[value].label)}</span>
            <span className="difficulty-hint">{t(UI.difficulty[value].hint)}</span>
          </button>
        ))}
      </div>
      <p className="settings-note">{t(UI.settings.note)}</p>
    </div>
  )
}
