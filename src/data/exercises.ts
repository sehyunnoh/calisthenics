import type { Locale, LocalizedText } from '../i18n/locale'

export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export type Category = 'push' | 'pull' | 'lower' | 'core' | 'cardio' | 'mobility'

export interface Exercise {
  id: string
  category: Category
  /** name shown per difficulty level, localized */
  variants: Record<Difficulty, LocalizedText>
  /** one-line form cue, localized */
  cue: LocalizedText
  /** verified YouTube video id demonstrating the movement, embedded in-app when present */
  videoId?: string
}

export const CATEGORY_ORDER: Category[] = ['push', 'pull', 'lower', 'core', 'cardio', 'mobility']

export const CATEGORY_LABEL: Record<Category, LocalizedText> = {
  push: { ko: '상체 밀기', en: 'Push' },
  pull: { ko: '상체 당기기', en: 'Pull' },
  lower: { ko: '하체', en: 'Lower Body' },
  core: { ko: '코어', en: 'Core' },
  cardio: { ko: '유산소', en: 'Cardio' },
  mobility: { ko: '모빌리티', en: 'Mobility' },
}

export const EXERCISES: Record<string, Exercise> = {
  pushup: {
    id: 'pushup',
    category: 'push',
    variants: {
      beginner: { ko: '무릎 푸시업', en: 'Knee Push-up' },
      intermediate: { ko: '푸시업', en: 'Push-up' },
      advanced: { ko: '다이아몬드 푸시업', en: 'Diamond Push-up' },
    },
    cue: {
      ko: '엉덩이가 처지지 않게 몸을 일직선으로 유지하세요.',
      en: 'Keep your body in a straight line without letting your hips sag.',
    },
    videoId: 'WDIpL0pjun0',
  },
  pike_pushup: {
    id: 'pike_pushup',
    category: 'push',
    variants: {
      beginner: { ko: '벽 파이크 푸시업', en: 'Wall Pike Push-up' },
      intermediate: { ko: '파이크 푸시업', en: 'Pike Push-up' },
      advanced: { ko: '엘리베이션 파이크 푸시업', en: 'Elevated Pike Push-up' },
    },
    cue: {
      ko: '엉덩이를 높이 들고 정수리 방향으로 내려가며 어깨를 자극하세요.',
      en: 'Lift your hips high and lower toward the crown of your head to target your shoulders.',
    },
    videoId: 'pHR5yG6xBps',
  },
  chair_dip: {
    id: 'chair_dip',
    category: 'push',
    variants: {
      beginner: { ko: '무릎 굽힌 체어 딥스', en: 'Bent-Knee Chair Dip' },
      intermediate: { ko: '체어 딥스', en: 'Chair Dip' },
      advanced: { ko: '다리 뻗은 체어 딥스', en: 'Straight-Leg Chair Dip' },
    },
    cue: {
      ko: '팔꿈치를 몸 뒤로 곧게 접었다 펴세요, 어깨는 내리고 유지.',
      en: 'Bend your elbows straight back and press up, keeping your shoulders down.',
    },
    videoId: 'gsXFaDBOppk',
  },
  plank: {
    id: 'plank',
    category: 'core',
    variants: {
      beginner: { ko: '무릎 플랭크', en: 'Knee Plank' },
      intermediate: { ko: '플랭크', en: 'Plank' },
      advanced: { ko: '한발 들기 플랭크', en: 'Plank with Leg Lift' },
    },
    cue: {
      ko: '허리가 꺾이지 않게 배와 엉덩이에 힘을 주세요.',
      en: "Brace your core and glutes so your lower back doesn't sag.",
    },
    videoId: '-V6gk1i4pvY',
  },
  squat: {
    id: 'squat',
    category: 'lower',
    variants: {
      beginner: { ko: '의자 스쿼트', en: 'Chair Squat' },
      intermediate: { ko: '바디웨이트 스쿼트', en: 'Bodyweight Squat' },
      advanced: { ko: '점프 스쿼트', en: 'Jump Squat' },
    },
    cue: {
      ko: '무릎이 발끝을 넘어가지 않게, 체중은 발뒤꿈치에.',
      en: 'Keep your knees behind your toes and your weight in your heels.',
    },
    videoId: 'CKcDiJnLaLY',
  },
  lunge: {
    id: 'lunge',
    category: 'lower',
    variants: {
      beginner: { ko: '스텝백 런지', en: 'Step-Back Lunge' },
      intermediate: { ko: '워킹 런지', en: 'Walking Lunge' },
      advanced: { ko: '점프 런지', en: 'Jump Lunge' },
    },
    cue: {
      ko: '앞무릎이 발끝 위에 오도록, 상체는 곧게 세우세요.',
      en: 'Keep your front knee over your ankle and your torso upright.',
    },
    videoId: '_GqxkGp7NAA',
  },
  glute_bridge: {
    id: 'glute_bridge',
    category: 'lower',
    variants: {
      beginner: { ko: '힙 브릿지', en: 'Glute Bridge' },
      intermediate: { ko: '한발 힙 브릿지', en: 'Single-Leg Glute Bridge' },
      advanced: { ko: '한발 힙 브릿지 홀드', en: 'Single-Leg Glute Bridge Hold' },
    },
    cue: {
      ko: '골반을 위로 밀어올리며 엉덩이를 꽉 조이세요.',
      en: 'Drive your hips up and squeeze your glutes at the top.',
    },
    videoId: 'nbjJjSa0cKo',
  },
  wall_sit: {
    id: 'wall_sit',
    category: 'lower',
    variants: {
      beginner: { ko: '월싯 (높게)', en: 'Wall Sit (High)' },
      intermediate: { ko: '월싯 (90도)', en: 'Wall Sit (90°)' },
      advanced: { ko: '월싯 한발 들기', en: 'Single-Leg Wall Sit' },
    },
    cue: {
      ko: '무릎이 90도가 되게, 등은 벽에 붙이세요.',
      en: 'Keep your knees at 90 degrees with your back flat against the wall.',
    },
    videoId: 'JaZNYM3zAP0',
  },
  mountain_climber: {
    id: 'mountain_climber',
    category: 'cardio',
    variants: {
      beginner: { ko: '느린 마운틴 클라이머', en: 'Slow Mountain Climber' },
      intermediate: { ko: '마운틴 클라이머', en: 'Mountain Climber' },
      advanced: { ko: '스프린트 마운틴 클라이머', en: 'Sprint Mountain Climber' },
    },
    cue: {
      ko: '엉덩이가 들리지 않게 플랭크 자세를 유지하며 무릎을 당기세요.',
      en: 'Keep your hips level in a plank position as you drive your knees in.',
    },
    videoId: 'e9Nwd8ckkYA',
  },
  crunch: {
    id: 'crunch',
    category: 'core',
    variants: {
      beginner: { ko: '크런치', en: 'Crunch' },
      intermediate: { ko: '바이시클 크런치', en: 'Bicycle Crunch' },
      advanced: { ko: '리버스 크런치', en: 'Reverse Crunch' },
    },
    cue: {
      ko: '목이 아니라 복부의 힘으로 상체를 말아 올리세요.',
      en: 'Curl up using your abs, not your neck.',
    },
    videoId: 'PAEo-zRSanM',
  },
  leg_raise: {
    id: 'leg_raise',
    category: 'core',
    variants: {
      beginner: { ko: '무릎 굽힌 레그 레이즈', en: 'Bent-Knee Leg Raise' },
      intermediate: { ko: '레그 레이즈', en: 'Leg Raise' },
      advanced: { ko: '레그 레이즈 홀드', en: 'Leg Raise Hold' },
    },
    cue: {
      ko: '허리가 바닥에서 뜨지 않게 하복부에 힘을 주세요.',
      en: 'Engage your lower abs so your lower back stays on the floor.',
    },
    videoId: 'xJJu-WiROM8',
  },
  burpee: {
    id: 'burpee',
    category: 'cardio',
    variants: {
      beginner: { ko: '스텝 버피', en: 'Step Burpee' },
      intermediate: { ko: '버피', en: 'Burpee' },
      advanced: { ko: '점프 버피', en: 'Jump Burpee' },
    },
    cue: {
      ko: '동작마다 호흡을 크게, 무리하지 말고 본인 속도로.',
      en: 'Breathe big with every rep — go at your own pace.',
    },
    videoId: 'qLBImHhCXSw',
  },
  superman: {
    id: 'superman',
    category: 'pull',
    variants: {
      beginner: { ko: '슈퍼맨 (교대로)', en: 'Alternating Superman' },
      intermediate: { ko: '슈퍼맨', en: 'Superman' },
      advanced: { ko: '슈퍼맨 홀드', en: 'Superman Hold' },
    },
    cue: {
      ko: '팔다리를 동시에 들어올리며 등 전체로 자극을 느끼세요.',
      en: 'Lift your arms and legs together and feel your whole back engage.',
    },
    videoId: 'cZxtPxeR2H8',
  },
  reverse_snow_angel: {
    id: 'reverse_snow_angel',
    category: 'pull',
    variants: {
      beginner: { ko: '작은 범위 리버스 스노우 엔젤', en: 'Small-Range Reverse Snow Angel' },
      intermediate: { ko: '리버스 스노우 엔젤', en: 'Reverse Snow Angel' },
      advanced: { ko: '리버스 스노우 엔젤 홀드', en: 'Reverse Snow Angel Hold' },
    },
    cue: {
      ko: '팔을 천천히 크게 원을 그리듯 움직이며 어깨뼈를 모으세요.',
      en: 'Move your arms slowly in a big arc, squeezing your shoulder blades together.',
    },
    videoId: '52w8iADvL8w',
  },
  bird_dog: {
    id: 'bird_dog',
    category: 'pull',
    variants: {
      beginner: { ko: '버드독 (짝다리)', en: 'Bird Dog (One Side)' },
      intermediate: { ko: '버드독', en: 'Bird Dog' },
      advanced: { ko: '버드독 홀드', en: 'Bird Dog Hold' },
    },
    cue: {
      ko: '반대쪽 팔다리를 뻗을 때 골반이 흔들리지 않게 하세요.',
      en: 'Keep your hips level as you extend opposite arm and leg.',
    },
    videoId: 'ZdAHe9_HeEw',
  },
  bulgarian_split_squat: {
    id: 'bulgarian_split_squat',
    category: 'lower',
    variants: {
      beginner: { ko: '얕은 불가리안 스플릿 스쿼트', en: 'Shallow Bulgarian Split Squat' },
      intermediate: { ko: '불가리안 스플릿 스쿼트', en: 'Bulgarian Split Squat' },
      advanced: { ko: '점프 불가리안 스플릿 스쿼트', en: 'Jump Bulgarian Split Squat' },
    },
    cue: {
      ko: '뒷발은 의자나 소파 위에, 앞다리 위주로 힘을 쓰세요.',
      en: 'Rest your back foot on a chair or sofa and drive through your front leg.',
    },
    videoId: 'VPhhE6bBzZE',
  },
  side_lunge: {
    id: 'side_lunge',
    category: 'lower',
    variants: {
      beginner: { ko: '작은 사이드 런지', en: 'Small Side Lunge' },
      intermediate: { ko: '사이드 런지', en: 'Side Lunge' },
      advanced: { ko: '사이드 런지 + 홀드', en: 'Side Lunge with Hold' },
    },
    cue: {
      ko: '옆으로 크게 내딛으며 엉덩이를 뒤로 빼세요.',
      en: 'Step wide to the side and push your hips back.',
    },
    videoId: 'apsp_uuXZTU',
  },
  sumo_squat: {
    id: 'sumo_squat',
    category: 'lower',
    variants: {
      beginner: { ko: '스모 스쿼트 (얕게)', en: 'Sumo Squat (Shallow)' },
      intermediate: { ko: '스모 스쿼트', en: 'Sumo Squat' },
      advanced: { ko: '스모 스쿼트 펄스', en: 'Sumo Squat Pulse' },
    },
    cue: {
      ko: '발끝을 넓게 벌리고 무릎을 발끝 방향으로 밀어주세요.',
      en: 'Take a wide stance and push your knees out toward your toes.',
    },
    videoId: 'kjlfpqXnyL8',
  },
  jumping_jack: {
    id: 'jumping_jack',
    category: 'cardio',
    variants: {
      beginner: { ko: '스텝 잭 (점프 없이)', en: 'Step Jack (No Jump)' },
      intermediate: { ko: '점핑잭', en: 'Jumping Jack' },
      advanced: { ko: '크로스 점핑잭', en: 'Cross Jumping Jack' },
    },
    cue: {
      ko: '리듬감 있게, 무릎에 무리가 가면 점프 없이 진행하세요.',
      en: 'Keep a steady rhythm — skip the jump if it bothers your knees.',
    },
    videoId: 'uLVt6u15L98',
  },
  cat_cow_stretch: {
    id: 'cat_cow_stretch',
    category: 'mobility',
    variants: {
      beginner: { ko: '캣카우 스트레칭', en: 'Cat-Cow Stretch' },
      intermediate: { ko: '캣카우 스트레칭', en: 'Cat-Cow Stretch' },
      advanced: { ko: '캣카우 스트레칭', en: 'Cat-Cow Stretch' },
    },
    cue: {
      ko: '호흡에 맞춰 척추를 천천히 말고 펴세요.',
      en: 'Round and arch your spine slowly in time with your breath.',
    },
    videoId: 'xyNwxiuERXc',
  },
  hip_flexor_stretch: {
    id: 'hip_flexor_stretch',
    category: 'mobility',
    variants: {
      beginner: { ko: '힙 플렉서 스트레칭', en: 'Hip Flexor Stretch' },
      intermediate: { ko: '힙 플렉서 스트레칭', en: 'Hip Flexor Stretch' },
      advanced: { ko: '힙 플렉서 스트레칭', en: 'Hip Flexor Stretch' },
    },
    cue: {
      ko: '골반을 앞으로 살짝 밀며 앞쪽 고관절이 늘어나는 느낌을 느끼세요.',
      en: 'Shift your hips slightly forward and feel the stretch in the front of your hip.',
    },
    videoId: 'KT0HlPGCl6k',
  },
  chest_shoulder_stretch: {
    id: 'chest_shoulder_stretch',
    category: 'mobility',
    variants: {
      beginner: { ko: '가슴/어깨 스트레칭', en: 'Chest & Shoulder Stretch' },
      intermediate: { ko: '가슴/어깨 스트레칭', en: 'Chest & Shoulder Stretch' },
      advanced: { ko: '가슴/어깨 스트레칭', en: 'Chest & Shoulder Stretch' },
    },
    cue: {
      ko: '문틀이나 벽을 잡고 가슴을 천천히 열어주세요.',
      en: 'Hold a doorway or wall and open your chest slowly.',
    },
    videoId: 'h4M4XmCBFd8',
  },
  hamstring_stretch: {
    id: 'hamstring_stretch',
    category: 'mobility',
    variants: {
      beginner: { ko: '햄스트링 스트레칭', en: 'Hamstring Stretch' },
      intermediate: { ko: '햄스트링 스트레칭', en: 'Hamstring Stretch' },
      advanced: { ko: '햄스트링 스트레칭', en: 'Hamstring Stretch' },
    },
    cue: {
      ko: '무릎을 살짝 펴고 상체를 천천히 숙이세요, 반동 없이.',
      en: 'Soften your knees slightly and fold forward slowly, no bouncing.',
    },
    videoId: '9ESpoUPqpFw',
  },
  deep_breathing: {
    id: 'deep_breathing',
    category: 'mobility',
    variants: {
      beginner: { ko: '딥브레싱 & 걷기', en: 'Deep Breathing & Walk' },
      intermediate: { ko: '딥브레싱 & 걷기', en: 'Deep Breathing & Walk' },
      advanced: { ko: '딥브레싱 & 걷기', en: 'Deep Breathing & Walk' },
    },
    cue: {
      ko: '코로 천천히 들이마시고 입으로 길게 내쉬며 몸을 이완하세요.',
      en: 'Inhale slowly through your nose and exhale long through your mouth to relax.',
    },
    videoId: '9jpchJcKivk',
  },
}

/** YouTube search link, used when no curated videoId is available yet. */
export function exerciseSearchUrl(exercise: Exercise, difficulty: Difficulty, locale: Locale): string {
  const name = exercise.variants[difficulty][locale]
  const suffix = locale === 'ko' ? '홈트 자세' : 'home workout form'
  const query = encodeURIComponent(`${name} ${suffix}`)
  return `https://www.youtube.com/results?search_query=${query}`
}

export function exerciseEmbedUrl(exercise: Exercise): string | undefined {
  return exercise.videoId ? `https://www.youtube.com/embed/${exercise.videoId}` : undefined
}

export function exerciseWatchUrl(exercise: Exercise): string | undefined {
  return exercise.videoId ? `https://www.youtube.com/watch?v=${exercise.videoId}` : undefined
}
