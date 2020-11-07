
const _PROD_: boolean = process.env.NODE_ENV === 'production'

let PORT = _PROD_ ? 8021 : 8020

export {
  PORT
}