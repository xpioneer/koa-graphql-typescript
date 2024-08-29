
const _PROD_ = process.env.NODE_ENV === 'production'

// JWT Secret Key, is very very very classified
export const JWT_SECRET = 'koa-grapqhql-secret'

// JWT Key, indicate current user
export const JWT_KEY = 'CUR_USER'

// JWT EXP_TIME
export const EXP_TIME = _PROD_ ?  1000 * 60 * 60 : 1000 * 60 * 60 * 2

// don't need auth url
export const NO_AUTH_URLS = [
  [/\/api\/login/,  /^post$/i],
  [/\/api\/register/,  /^post$/i],
  [/\/graphql/, /^get$/i],
  [/\/view/,  /^get$/i]
]


export const Baidu = `Baidu WebPage`

export const Tmall = `Tmall WebPage`