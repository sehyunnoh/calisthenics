export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export type Category = 'push' | 'pull' | 'lower' | 'core' | 'cardio' | 'mobility'

export interface Exercise {
  id: string
  /** display name at intermediate level, used for search links etc. */
  baseName: string
  category: Category
  /** name shown per difficulty level */
  variants: Record<Difficulty, string>
  /** one-line form cue */
  cue: string
  /** optional curated video URL; when absent we fall back to a YouTube search link */
  videoUrl?: string
}

export const CATEGORY_LABEL: Record<Category, string> = {
  push: '상체 밀기',
  pull: '상체 당기기',
  lower: '하체',
  core: '코어',
  cardio: '유산소',
  mobility: '모빌리티',
}

export const EXERCISES: Record<string, Exercise> = {
  pushup: {
    id: 'pushup',
    baseName: '푸시업',
    category: 'push',
    variants: {
      beginner: '무릎 푸시업',
      intermediate: '푸시업',
      advanced: '다이아몬드 푸시업',
    },
    cue: '엉덩이가 처지지 않게 몸을 일직선으로 유지하세요.',
  },
  pike_pushup: {
    id: 'pike_pushup',
    baseName: '파이크 푸시업',
    category: 'push',
    variants: {
      beginner: '벽 파이크 푸시업',
      intermediate: '파이크 푸시업',
      advanced: '엘리베이션 파이크 푸시업',
    },
    cue: '엉덩이를 높이 들고 정수리 방향으로 내려가며 어깨를 자극하세요.',
  },
  chair_dip: {
    id: 'chair_dip',
    baseName: '체어 딥스',
    category: 'push',
    variants: {
      beginner: '무릎 굽힌 체어 딥스',
      intermediate: '체어 딥스',
      advanced: '다리 뻗은 체어 딥스',
    },
    cue: '팔꿈치를 몸 뒤로 곧게 접었다 펴세요, 어깨는 내리고 유지.',
  },
  plank: {
    id: 'plank',
    baseName: '플랭크',
    category: 'core',
    variants: {
      beginner: '무릎 플랭크',
      intermediate: '플랭크',
      advanced: '한발 들기 플랭크',
    },
    cue: '허리가 꺾이지 않게 배와 엉덩이에 힘을 주세요.',
  },
  squat: {
    id: 'squat',
    baseName: '스쿼트',
    category: 'lower',
    variants: {
      beginner: '의자 스쿼트',
      intermediate: '바디웨이트 스쿼트',
      advanced: '점프 스쿼트',
    },
    cue: '무릎이 발끝을 넘어가지 않게, 체중은 발뒤꿈치에.',
  },
  lunge: {
    id: 'lunge',
    baseName: '런지',
    category: 'lower',
    variants: {
      beginner: '스텝백 런지',
      intermediate: '워킹 런지',
      advanced: '점프 런지',
    },
    cue: '앞무릎이 발끝 위에 오도록, 상체는 곧게 세우세요.',
  },
  glute_bridge: {
    id: 'glute_bridge',
    baseName: '힙 브릿지',
    category: 'lower',
    variants: {
      beginner: '힙 브릿지',
      intermediate: '한발 힙 브릿지',
      advanced: '한발 힙 브릿지 홀드',
    },
    cue: '골반을 위로 밀어올리며 엉덩이를 꽉 조이세요.',
  },
  wall_sit: {
    id: 'wall_sit',
    baseName: '월싯',
    category: 'lower',
    variants: {
      beginner: '월싯 (높게)',
      intermediate: '월싯 (90도)',
      advanced: '월싯 한발 들기',
    },
    cue: '무릎이 90도가 되게, 등은 벽에 붙이세요.',
  },
  mountain_climber: {
    id: 'mountain_climber',
    baseName: '마운틴 클라이머',
    category: 'cardio',
    variants: {
      beginner: '느린 마운틴 클라이머',
      intermediate: '마운틴 클라이머',
      advanced: '스프린트 마운틴 클라이머',
    },
    cue: '엉덩이가 들리지 않게 플랭크 자세를 유지하며 무릎을 당기세요.',
  },
  crunch: {
    id: 'crunch',
    baseName: '크런치',
    category: 'core',
    variants: {
      beginner: '크런치',
      intermediate: '바이시클 크런치',
      advanced: '리버스 크런치',
    },
    cue: '목이 아니라 복부의 힘으로 상체를 말아 올리세요.',
  },
  leg_raise: {
    id: 'leg_raise',
    baseName: '레그 레이즈',
    category: 'core',
    variants: {
      beginner: '무릎 굽힌 레그 레이즈',
      intermediate: '레그 레이즈',
      advanced: '레그 레이즈 홀드',
    },
    cue: '허리가 바닥에서 뜨지 않게 하복부에 힘을 주세요.',
  },
  burpee: {
    id: 'burpee',
    baseName: '버피',
    category: 'cardio',
    variants: {
      beginner: '스텝 버피',
      intermediate: '버피',
      advanced: '점프 버피',
    },
    cue: '동작마다 호흡을 크게, 무리하지 말고 본인 속도로.',
  },
  superman: {
    id: 'superman',
    baseName: '슈퍼맨',
    category: 'pull',
    variants: {
      beginner: '슈퍼맨 (교대로)',
      intermediate: '슈퍼맨',
      advanced: '슈퍼맨 홀드',
    },
    cue: '팔다리를 동시에 들어올리며 등 전체로 자극을 느끼세요.',
  },
  reverse_snow_angel: {
    id: 'reverse_snow_angel',
    baseName: '리버스 스노우 엔젤',
    category: 'pull',
    variants: {
      beginner: '작은 범위 리버스 스노우 엔젤',
      intermediate: '리버스 스노우 엔젤',
      advanced: '리버스 스노우 엔젤 홀드',
    },
    cue: '팔을 천천히 크게 원을 그리듯 움직이며 어깨뼈를 모으세요.',
  },
  bird_dog: {
    id: 'bird_dog',
    baseName: '버드독',
    category: 'pull',
    variants: {
      beginner: '버드독 (짝다리)',
      intermediate: '버드독',
      advanced: '버드독 홀드',
    },
    cue: '반대쪽 팔다리를 뻗을 때 골반이 흔들리지 않게 하세요.',
  },
  bulgarian_split_squat: {
    id: 'bulgarian_split_squat',
    baseName: '불가리안 스플릿 스쿼트',
    category: 'lower',
    variants: {
      beginner: '얕은 불가리안 스플릿 스쿼트',
      intermediate: '불가리안 스플릿 스쿼트',
      advanced: '점프 불가리안 스플릿 스쿼트',
    },
    cue: '뒷발은 의자나 소파 위에, 앞다리 위주로 힘을 쓰세요.',
  },
  side_lunge: {
    id: 'side_lunge',
    baseName: '사이드 런지',
    category: 'lower',
    variants: {
      beginner: '작은 사이드 런지',
      intermediate: '사이드 런지',
      advanced: '사이드 런지 + 홀드',
    },
    cue: '옆으로 크게 내딛으며 엉덩이를 뒤로 빼세요.',
  },
  sumo_squat: {
    id: 'sumo_squat',
    baseName: '스모 스쿼트',
    category: 'lower',
    variants: {
      beginner: '스모 스쿼트 (얕게)',
      intermediate: '스모 스쿼트',
      advanced: '스모 스쿼트 펄스',
    },
    cue: '발끝을 넓게 벌리고 무릎을 발끝 방향으로 밀어주세요.',
  },
  jumping_jack: {
    id: 'jumping_jack',
    baseName: '점핑잭',
    category: 'cardio',
    variants: {
      beginner: '스텝 잭 (점프 없이)',
      intermediate: '점핑잭',
      advanced: '크로스 점핑잭',
    },
    cue: '리듬감 있게, 무릎에 무리가 가면 점프 없이 진행하세요.',
  },
  cat_cow_stretch: {
    id: 'cat_cow_stretch',
    baseName: '캣카우 스트레칭',
    category: 'mobility',
    variants: {
      beginner: '캣카우 스트레칭',
      intermediate: '캣카우 스트레칭',
      advanced: '캣카우 스트레칭',
    },
    cue: '호흡에 맞춰 척추를 천천히 말고 펴세요.',
  },
  hip_flexor_stretch: {
    id: 'hip_flexor_stretch',
    baseName: '힙 플렉서 스트레칭',
    category: 'mobility',
    variants: {
      beginner: '힙 플렉서 스트레칭',
      intermediate: '힙 플렉서 스트레칭',
      advanced: '힙 플렉서 스트레칭',
    },
    cue: '골반을 앞으로 살짝 밀며 앞쪽 고관절이 늘어나는 느낌을 느끼세요.',
  },
  chest_shoulder_stretch: {
    id: 'chest_shoulder_stretch',
    baseName: '가슴/어깨 스트레칭',
    category: 'mobility',
    variants: {
      beginner: '가슴/어깨 스트레칭',
      intermediate: '가슴/어깨 스트레칭',
      advanced: '가슴/어깨 스트레칭',
    },
    cue: '문틀이나 벽을 잡고 가슴을 천천히 열어주세요.',
  },
  hamstring_stretch: {
    id: 'hamstring_stretch',
    baseName: '햄스트링 스트레칭',
    category: 'mobility',
    variants: {
      beginner: '햄스트링 스트레칭',
      intermediate: '햄스트링 스트레칭',
      advanced: '햄스트링 스트레칭',
    },
    cue: '무릎을 살짝 펴고 상체를 천천히 숙이세요, 반동 없이.',
  },
  deep_breathing: {
    id: 'deep_breathing',
    baseName: '딥브레싱 & 걷기',
    category: 'mobility',
    variants: {
      beginner: '딥브레싱 & 걷기',
      intermediate: '딥브레싱 & 걷기',
      advanced: '딥브레싱 & 걷기',
    },
    cue: '코로 천천히 들이마시고 입으로 길게 내쉬며 몸을 이완하세요.',
  },
}

export function exerciseVideoUrl(exercise: Exercise, difficulty: Difficulty): string {
  if (exercise.videoUrl) return exercise.videoUrl
  const query = encodeURIComponent(`${exercise.variants[difficulty]} 홈트 자세`)
  return `https://www.youtube.com/results?search_query=${query}`
}
