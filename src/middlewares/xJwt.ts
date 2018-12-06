import { Context } from '@core/koa'
import JWT, { Options } from '../core/jwt/index'
import { JWT_SECRET, JWT_KEY } from '../constants'

export default JWT({
  debug: true,
  secret: JWT_SECRET,
  key: JWT_KEY,
  unless: [/\/api\/login/]
})