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
    tapHint: {
      ko: '동작을 탭하면 영상으로 확인할 수 있어요',
      en: 'Tap an exercise to watch how it looks',
    } as LocalizedText,
  },
  reminder: {
    title: { ko: '오늘 운동 아직 안 했어요 💪', en: "You haven't worked out today 💪" } as LocalizedText,
    body: { ko: '10분이면 충분해요. 지금 시작해볼까요?', en: 'Ten minutes is enough. Ready to start?' } as LocalizedText,
    banner: {
      ko: '⏰ 오늘 운동을 아직 완료하지 않았어요. 밤 10시 전에 끝내봐요!',
      en: "⏰ You haven't completed today's workout yet. Finish it before 10 PM!",
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
    reminderTitle: { ko: '운동 알림', en: 'Workout Reminder' } as LocalizedText,
    reminderOn: { ko: '🔔 알림 켜짐', en: '🔔 Reminder on' } as LocalizedText,
    reminderOff: { ko: '🔕 알림 꺼짐', en: '🔕 Reminder off' } as LocalizedText,
    reminderHint: {
      ko: '18시까지 운동을 완료하지 않으면 밤 10시 전까지 1시간마다 알려줘요. 앱을 닫아 둬도 알려줘요. (운동을 완료하면 그날 알림은 멈춰요)',
      en: "If today's workout isn't done by 6 PM, you'll be reminded every hour until 10 PM. Works even when the app is closed, and stops once you finish.",
    } as LocalizedText,
    reminderDenied: {
      ko: '브라우저에서 알림이 차단되어 있어요. 사이트 설정에서 알림을 허용해 주세요.',
      en: 'Notifications are blocked. Please allow them in your browser site settings.',
    } as LocalizedText,
    reminderError: {
      ko: '알림 등록에 실패했어요. 네트워크를 확인하고 다시 시도해 주세요.',
      en: 'Could not set up the reminder. Check your connection and try again.',
    } as LocalizedText,
    reminderUnsupported: {
      ko: '이 브라우저에서는 푸시 알림을 쓸 수 없어요. (iOS는 홈 화면에 추가 후 사용해 주세요)',
      en: 'Push notifications are unavailable in this browser. (On iOS, add the app to your home screen first.)',
    } as LocalizedText,
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
    viewExercise: { ko: '🎥 동작 영상 보기', en: '🎥 Watch exercise video' } as LocalizedText,
    musicOn: { ko: '🎵 음악 끄기', en: '🎵 Music off' } as LocalizedText,
    musicOff: { ko: '🔇 음악 켜기', en: '🔇 Music on' } as LocalizedText,
  },
  nav: {
    home: { ko: '🏠 홈', en: '🏠 Home' } as LocalizedText,
    encyclopedia: { ko: '📖 사전', en: '📖 Guide' } as LocalizedText,
    record: { ko: '📅 기록', en: '📅 Record' } as LocalizedText,
    videos: { ko: '🎬 영상', en: '🎬 Videos' } as LocalizedText,
    settings: { ko: '⚙️ 설정', en: '⚙️ Settings' } as LocalizedText,
  },
  videos: {
    eyebrow: { ko: '내 영상', en: 'My Videos' } as LocalizedText,
    title: { ko: '저장한 운동 영상', en: 'Saved Workout Videos' } as LocalizedText,
    linkPlaceholder: { ko: '유튜브 링크 붙여넣기', en: 'Paste a YouTube link' } as LocalizedText,
    titlePlaceholder: { ko: '제목 / 메모 (선택)', en: 'Title / note (optional)' } as LocalizedText,
    add: { ko: '추가하기', en: 'Add' } as LocalizedText,
    untitled: { ko: '제목 없는 영상', en: 'Untitled video' } as LocalizedText,
    invalidLink: {
      ko: '유튜브 링크가 아닌 것 같아요. 주소를 다시 확인해 주세요.',
      en: "That doesn't look like a YouTube link.",
    } as LocalizedText,
    duplicate: { ko: '이미 저장한 영상이에요.', en: 'Already saved.' } as LocalizedText,
    empty: {
      ko: '아직 저장한 영상이 없어요. 유튜브에서 마음에 드는 영상을 찾으면 공유 → 링크 복사 후 붙여넣어 보세요.',
      en: 'No videos yet. When you find a good one on YouTube, copy its link and paste it above.',
    } as LocalizedText,
    confirmRemove: { ko: '이 영상을 목록에서 삭제할까요?', en: 'Remove this video from your list?' } as LocalizedText,
    remove: { ko: '삭제', en: 'Remove' } as LocalizedText,
    note: {
      ko: '저장한 영상은 이 기기의 브라우저에만 저장돼요.',
      en: "Saved videos are stored only in this device's browser.",
    } as LocalizedText,
  },
  encyclopedia: {
    eyebrow: { ko: '운동 백과사전', en: 'Exercise Guide' } as LocalizedText,
    title: { ko: '모든 동작 둘러보기', en: 'Browse All Exercises' } as LocalizedText,
  },
  modal: {
    close: { ko: '닫기', en: 'Close' } as LocalizedText,
    noVideo: {
      ko: '아직 등록된 영상이 없어요. 아래 버튼으로 유튜브에서 찾아보세요.',
      en: "No curated video yet — use the button below to find one on YouTube.",
    } as LocalizedText,
    openInYoutube: { ko: '유튜브에서 보기 ↗', en: 'Open on YouTube ↗' } as LocalizedText,
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

export function tenSecondsLeftAnnouncement(locale: Locale): string {
  return locale === 'ko' ? '10초 남았어요' : '10 seconds left'
}
