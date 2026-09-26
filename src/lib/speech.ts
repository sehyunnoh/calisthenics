import type { Locale } from '../i18n/locale'

const KOREAN_COUNTDOWN: Record<number, string> = {
  5: '오',
  4: '사',
  3: '삼',
  2: '이',
  1: '일',
}

export function speak(text: string, locale: Locale): void {
  try {
    const synth = window.speechSynthesis
    if (!synth) return
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = locale === 'ko' ? 'ko-KR' : 'en-US'
    synth.cancel()
    synth.speak(utterance)
  } catch {
    // speech synthesis unavailable - stay silent rather than error
  }
}

export function speakCountdownNumber(n: number, locale: Locale): void {
  const text = locale === 'ko' ? (KOREAN_COUNTDOWN[n] ?? String(n)) : String(n)
  speak(text, locale)
}
