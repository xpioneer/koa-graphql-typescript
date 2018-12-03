import * as JWT from 'koa-jwt'
import { Context } from '@core/koa'

const Secret = 'koa-grapqhql-secret'
const Key = 'koa-grapqhql-key'

export default JWT({
  secret: Secret,
  key: Key
}).unless({path: [/\/api\/login/]})
