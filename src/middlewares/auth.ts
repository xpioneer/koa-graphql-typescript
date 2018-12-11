import { Context } from '@core/koa'
import Store from "../utils/session/store";

const PROD = process.env.NODE_ENV === "production";
const store = new Store

export default async(ctx: Context, next: () => Promise<any>) => {
  const path = '/api/login'
  const tokens: string = ctx.header['authorization'] || ''
  const token = tokens.split(' ')[1]
  if(path !== ctx.path && token && token.split('.').length === 3) {
    const authorized = await store.get(token)
    if(authorized) {
      await next()
    } else {
      ctx.throw(401)
    }
  } else {
    await next()
  }
}