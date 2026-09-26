import { useMemo, useState } from 'react'
import './App.css'
import WorkoutSession from './components/WorkoutSession'
import { routineForDay } from './data/routines'
import { useLocale } from './i18n/locale'
import { UI } from './i18n/ui'
import Home from './pages/Home'
import Record from './pages/Record'
import Settings from './pages/Settings'
import { getCompletions, getSettings, getStreak, isTodayCompleted, markCompleted, setSettings } from './lib/storage'

type View = 'home' | 'session' | 'record' | 'settings'

export default function App() {
  const { t } = useLocale()
  const [view, setView] = useState<View>('home')
  const [difficulty, setDifficulty] = useState(() => getSettings().difficulty)
  const [completedToday, setCompletedToday] = useState(() => isTodayCompleted())
  const [completions, setCompletions] = useState(() => getCompletions())
  const [streak, setStreak] = useState(() => getStreak())

  const routine = useMemo(() => routineForDay(new Date().getDay()), [])

  function refreshRecords() {
    setCompletedToday(isTodayCompleted())
    setCompletions(getCompletions())
    setStreak(getStreak())
  }

  function handleFinishSession() {
    markCompleted()
    refreshRecords()
    setView('home')
  }

  function handleDifficultyChange(next: typeof difficulty) {
    setDifficulty(next)
    setSettings({ difficulty: next })
  }

  return (
    <div className="app-shell">
      <main className="app-content">
        {view === 'home' && (
          <Home
            routine={routine}
            difficulty={difficulty}
            completedToday={completedToday}
            streak={streak}
            onStart={() => setView('session')}
          />
        )}
        {view === 'session' && (
          <WorkoutSession
            routine={routine}
            difficulty={difficulty}
            onFinish={handleFinishSession}
            onExit={() => setView('home')}
          />
        )}
        {view === 'record' && <Record completions={completions} streak={streak} />}
        {view === 'settings' && <Settings difficulty={difficulty} onChange={handleDifficultyChange} />}
      </main>

      {view !== 'session' && (
        <nav className="bottom-nav">
          <button className={view === 'home' ? 'active' : ''} onClick={() => setView('home')}>
            {t(UI.nav.home)}
          </button>
          <button className={view === 'record' ? 'active' : ''} onClick={() => setView('record')}>
            {t(UI.nav.record)}
          </button>
          <button className={view === 'settings' ? 'active' : ''} onClick={() => setView('settings')}>
            {t(UI.nav.settings)}
          </button>
        </nav>
      )}
    </div>
  )
}
