# 운동 알림 푸시 서버 (Cloudflare Worker)

매시 정각에 실행되어, 현지 시각이 18:00~21:59인 기기 중 **오늘 운동을 완료하지 않은** 기기에 Web Push를 보냅니다.
푸시에 내용(payload)은 없고, 알림 문구는 `public/sw.js`가 만듭니다.

## 최초 설정 (한 번만)

```bash
cd worker
npm install
npx wrangler login

# 1) VAPID 키 생성 -> 공개키와 비밀 JWK 출력
npm run vapid

# 2) KV 저장소 생성 -> 출력된 id 를 wrangler.toml 의 kv_namespaces.id 에 입력
npx wrangler kv namespace create SUBS

# 3) wrangler.toml 의 VAPID_PUBLIC_KEY 에 공개키 입력, 비밀 JWK 는 secret 으로 등록
npx wrangler secret put VAPID_PRIVATE_JWK

# 4) 배포 -> https://calisthenics-push.<서브도메인>.workers.dev 주소가 출력됨
npm run deploy
```

## 프론트엔드 연결

GitHub 저장소 → Settings → Secrets and variables → Actions → **Variables** 에 추가:

| 이름 | 값 |
| --- | --- |
| `VITE_PUSH_API_URL` | 위에서 출력된 워커 주소 |
| `VITE_VAPID_PUBLIC_KEY` | `npm run vapid` 로 만든 공개키 |

그 뒤 `main`에 push(또는 Actions 수동 실행)하면 배포됩니다. 로컬 개발은 `.env.example`을 `.env.local`로 복사해 채우세요.

## API

- `POST /subscribe` `{ subscription, tz, date?, done? }`
- `POST /status` `{ endpoint, date, done }`
- `POST /unsubscribe` `{ endpoint }`

푸시 서비스(FCM 등)가 404/410을 돌려주면 해당 구독은 자동으로 삭제됩니다.
`ALLOWED_ORIGINS`(wrangler.toml)에 없는 사이트에서는 CORS로 호출할 수 없습니다.
