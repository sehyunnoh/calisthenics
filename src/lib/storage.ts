import type { Difficulty } from '../data/exercises'
import { addDays, todayKey } from './date'

const SETTINGS_KEY = 'calisthenics.settings.v1'
const COMPLETIONS_KEY = 'calisthenics.completions.v1'

export interface Settings {
  difficulty: Difficulty
  musicEnabled: boolean
}

const DEFAULT_SETTINGS: Settings = { difficulty: 'intermediate', musicEnabled: true }

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function writeJson<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // localStorage unavailable (private mode, quota, etc.) - fail silently
  }
}

export function getSettings(): Settings {
  return { ...DEFAULT_SETTINGS, ...readJson<Partial<Settings>>(SETTINGS_KEY, {}) }
}

export function setSettings(settings: Settings): void {
  writeJson(SETTINGS_KEY, settings)
}

function getCompletionSet(): Set<string> {
  return new Set(readJson<string[]>(COMPLETIONS_KEY, []))
}

export function isCompleted(dateKey: string): boolean {
  return getCompletionSet().has(dateKey)
}

export function isTodayCompleted(): boolean {
  return isCompleted(todayKey())
}

export function markCompleted(dateKey: string = todayKey()): void {
  const set = getCompletionSet()
  set.add(dateKey)
  writeJson(COMPLETIONS_KEY, Array.from(set))
}

export function unmarkCompleted(dateKey: string = todayKey()): void {
  const set = getCompletionSet()
  set.delete(dateKey)
  writeJson(COMPLETIONS_KEY, Array.from(set))
}

export function getCompletions(): string[] {
  return Array.from(getCompletionSet()).sort()
}

/** Consecutive-day streak ending today (or yesterday, if today isn't done yet). */
export function getStreak(): number {
  const set = getCompletionSet()
  let cursor = new Date()
  if (!set.has(todayKey(cursor))) {
    cursor = addDays(cursor, -1)
  }
  let streak = 0
  while (set.has(todayKey(cursor))) {
    streak += 1
    cursor = addDays(cursor, -1)
  }
  return streak
}
