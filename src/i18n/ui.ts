import type { Locale, LocalizedText } from './locale'

export const UI = {
  home: {
    eyebrow: { ko: '오늘의 루틴', en: "Today's Routine" } as LocalizedText,
    start: { ko: '시작하기', en: 'Start' } as LocalizedText,
    restart: { ko: '다시 운동하기', en: 'Do it again' } as LocalizedText,
    doneNote: {
      ko: '오늘 운동은 이미 완료했어요. 다시 해도 좋아요 💪',
      en: "You've already completed today's workout. Feel free to go again 💪",
    } as LocalizedText,
  },
  record: {
    eyebrow: { ko: '나의 기록', en: 'My Record' } as LocalizedText,
    startToday: { ko: '오늘부터 시작해봐요', en: 'Start today' } as LocalizedText,
    caption: { ko: '최근 6주', en: 'Last 6 weeks' } as LocalizedText,
  },
  settings: {
    eyebrow: { ko: '설정', en: 'Settings' } as LocalizedText,
    difficultyTitle: { ko: '난이도', en: 'Difficulty' } as LocalizedText,
    languageTitle: { ko: '언어', en: 'Language' } as LocalizedText,
    note: {
      ko: '모든 기록과 설정은 이 기기의 브라우저에만 저장돼요 (localStorage). 다른 기기나 브라우저에서는 기록이 공유되지 않아요.',
      en: "All records and settings are stored only in this device's browser (localStorage). They are not shared with other devices or browsers.",
    } as LocalizedText,
  },
  session: {
    exit: { ko: '✕ 종료', en: '✕ Exit' } as LocalizedText,
    pause: { ko: '⏸ 일시정지', en: '⏸ Pause' } as LocalizedText,
    resume: { ko: '▶ 계속', en: '▶ Resume' } as LocalizedText,
    next: { ko: '다음 ⏭', en: 'Next ⏭' } as LocalizedText,
  },
  nav: {
    home: { ko: '🏠 홈', en: '🏠 Home' } as LocalizedText,
    record: { ko: '📅 기록', en: '📅 Record' } as LocalizedText,
    settings: { ko: '⚙️ 설정', en: '⚙️ Settings' } as LocalizedText,
  },
  kind: {
    warmup: { ko: '웜업', en: 'Warm-up' } as LocalizedText,
    work: { ko: '운동', en: 'Work' } as LocalizedText,
    rest: { ko: '휴식', en: 'Rest' } as LocalizedText,
    cooldown: { ko: '쿨다운', en: 'Cool-down' } as LocalizedText,
  },
  difficulty: {
    beginner: {
      label: { ko: '초급', en: 'Beginner' } as LocalizedText,
      hint: {
        ko: '운동을 막 시작했거나 관절 부담을 줄이고 싶을 때',
        en: 'Just starting out, or want to go easier on your joints',
      } as LocalizedText,
    },
    intermediate: {
      label: { ko: '중급', en: 'Intermediate' } as LocalizedText,
      hint: {
        ko: '기본 동작이 편안하게 느껴질 때 (기본값)',
        en: 'When the basic moves feel comfortable (default)',
      } as LocalizedText,
    },
    advanced: {
      label: { ko: '고급', en: 'Advanced' } as LocalizedText,
      hint: {
        ko: '더 강한 자극과 난이도를 원할 때',
        en: 'When you want more intensity and challenge',
      } as LocalizedText,
    },
  },
}

export function streakLabel(locale: Locale, days: number): string {
  return locale === 'ko' ? `🔥 ${days}일 연속` : `🔥 ${days}-day streak`
}

export function recordTitle(locale: Locale, streak: number): string {
  if (streak <= 0) return UI.record.startToday[locale]
  return locale === 'ko' ? `${streak}일 연속 운동 중 🔥` : `${streak}-day streak 🔥`
}

export function totalCompletedLabel(locale: Locale, count: number): string {
  return locale === 'ko' ? `총 완료 ${count}일` : `Total ${count} days completed`
}

export function exerciseMetaLabel(locale: Locale, sets: number, work: number, rest: number): string {
  return locale === 'ko' ? `${sets}세트 · ${work}초 / 휴식 ${rest}초` : `${sets} sets · ${work}s / rest ${rest}s`
}

export function setProgressLabel(locale: Locale, name: string, set: number, sets: number): string {
  return locale === 'ko' ? `${name} · ${set}/${sets}세트` : `${name} · Set ${set}/${sets}`
}

export function videoLinkLabel(locale: Locale, name: string): string {
  return locale === 'ko' ? `▶ ${name} 영상 보기` : `▶ Watch ${name} video`
}
