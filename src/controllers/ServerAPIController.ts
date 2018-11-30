import { Context } from '@core/koa'
import axios from 'axios'


export default class ServerAPIController {

  static async KDJZ (ctx: Context) {
    const HOST = 'http://www.google.com'
    const token = ctx.header['token']
    const UA = ctx.header['user-agent']
    let path = ctx.path
    const input  = ctx.fields

    if(/^\/platform/.test(path)) {
      const result = await axios.post(HOST + path, input, {
        headers: {
          'token': token,
          'User-Agent': UA
        }
      })
      ctx.body = result.data
    } else {
      ctx.body = { data: {}, msg: 'empty' }
    } 
  }

  static async compose (ctx: Context) {
    const HOST = 'https://www.google.com'
    console.log('--react--')
    const token = ctx.header['token']
    const UA = ctx.header['user-agent']
    let path = ctx.path
    const input  = ctx.fields
    if(/^\/platform/.test(path)) {
      const result = await axios.post(HOST + path, input, {
        headers: {
          'token': token,
          'User-Agent': UA
        }
      })
      ctx.body = result.data
    } else {
      ctx.body = { data: {}, msg: 'empty' }
    }
    
  }

}