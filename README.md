# 맨몸 홈트 (Calisthenics)

집에서 매일 따라 할 수 있는 맨몸 운동 웹앱. 요일별 루틴, 인터벌 타이머, 완료 체크 & 연속일수(스트릭) 기록, 운동별 시연 영상, 전체 운동 백과사전, 한국어/영어 전환을 제공합니다.

- 배포: https://sehyunnoh.github.io/calisthenics/
- 데이터 저장: 브라우저 `localStorage` (서버 없음, 기기별 저장)
- 운동 영상: 홈 화면 루틴 목록, 운동 진행 화면, 백과사전(하단 "사전" 탭) 어디서든 운동 이름을 탭하면 모달로 시연 영상이 재생됩니다.

## 개발

```bash
npm install
npm run dev
```

## 빌드

```bash
npm run build
```

`main` 브랜치에 push하면 GitHub Actions가 자동으로 빌드해서 GitHub Pages에 배포합니다.

## 루틴/난이도/영상 수정

- `src/data/exercises.ts`: 동작 목록, 난이도별 이름, 자세 설명(cue), 시연 영상(`videoId`, 유튜브 video id)
- `src/data/routines.ts`: 요일별 루틴 구성, 세트/시간 값
- `src/i18n/ui.ts`: 화면 문구(한/영) 번역

동작에 `videoId`가 없으면 자동으로 유튜브 검색 링크로 대체됩니다.
