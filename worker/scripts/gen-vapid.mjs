// Generates a VAPID key pair for Web Push.
//   public key  -> worker/wrangler.toml (VAPID_PUBLIC_KEY) and the frontend's VITE_VAPID_PUBLIC_KEY
//   private JWK -> `wrangler secret put VAPID_PRIVATE_JWK` (never commit it)
import { generateKeyPairSync } from 'node:crypto'

const { publicKey, privateKey } = generateKeyPairSync('ec', { namedCurve: 'P-256' })
const pub = publicKey.export({ format: 'jwk' })
const priv = privateKey.export({ format: 'jwk' })

const rawPublic = Buffer.concat([Buffer.from([0x04]), Buffer.from(pub.x, 'base64url'), Buffer.from(pub.y, 'base64url')])

console.log('VAPID public key (공개 가능):')
console.log(rawPublic.toString('base64url'))
console.log('\nVAPID private JWK (비밀! wrangler secret put VAPID_PRIVATE_JWK 에 붙여넣기):')
console.log(JSON.stringify(priv))
