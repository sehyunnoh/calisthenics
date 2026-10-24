import { useState } from 'react'
import type { Difficulty } from '../data/exercises'
import type { Locale } from '../i18n/locale'
import { useLocale } from '../i18n/locale'
import { UI } from '../i18n/ui'
import { enableReminder, getPermission, type EnableResult } from '../lib/reminder'

interface SettingsProps {
  difficulty: Difficulty
  onChange: (difficulty: Difficulty) => void
  reminderEnabled: boolean
  onReminderChange: (enabled: boolean) => void
}

const DIFFICULTIES: Difficulty[] = ['beginner', 'intermediate', 'advanced']

const LANGUAGES: { value: Locale; label: string }[] = [
  { value: 'ko', label: '한국어' },
  { value: 'en', label: 'English' },
]

export default function Settings({ difficulty, onChange, reminderEnabled, onReminderChange }: SettingsProps) {
  const { locale, setLocale, t } = useLocale()
  const [permission, setPermission] = useState<EnableResult>(() => getPermission())

  async function handleReminderToggle() {
    if (reminderEnabled) {
      onReminderChange(false)
      return
    }
    const result = await enableReminder()
    setPermission(result)
    if (result === 'granted') onReminderChange(true)
  }

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

      <h1 className="page-title">{t(UI.settings.reminderTitle)}</h1>
      <button className={`reminder-toggle${reminderEnabled ? ' selected' : ''}`} onClick={handleReminderToggle}>
        {reminderEnabled ? t(UI.settings.reminderOn) : t(UI.settings.reminderOff)}
      </button>
      <p className="reminder-hint">
        {permission === 'denied'
          ? t(UI.settings.reminderDenied)
          : permission === 'unsupported'
            ? t(UI.settings.reminderUnsupported)
            : permission === 'error'
              ? t(UI.settings.reminderError)
              : t(UI.settings.reminderHint)}
      </p>

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
