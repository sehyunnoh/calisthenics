# 맨몸 홈트 (Calisthenics)

집에서 매일 따라 할 수 있는 맨몸 운동 웹앱. 요일별 루틴, 인터벌 타이머, 완료 체크 & 연속일수(스트릭) 기록을 제공합니다.

- 배포: https://sehyunnoh.github.io/calisthenics/
- 데이터 저장: 브라우저 `localStorage` (서버 없음, 기기별 저장)

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

## 루틴/난이도 수정

- `src/data/exercises.ts`: 동작 목록, 난이도별 이름, 영상 링크
- `src/data/routines.ts`: 요일별 루틴 구성, 세트/시간 값
