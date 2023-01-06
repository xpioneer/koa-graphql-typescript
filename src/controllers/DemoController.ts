import {getMongoManager, getMongoRepository, Like, Between, FindManyOptions, Equal} from "typeorm";
import { Context } from '@/core/koa'
import { Baidu, Tmall } from "../constants";
import { Delay } from '@/utils/tools'



export default class LogsController {


  static async views(ctx: Context) {
    console.log(ctx.params)
    const { site } = ctx.params
    if(site === 'baidu') {
      ctx.body = Baidu
    } else if (site === 'tmall') {
      ctx.body = Tmall
    } else {
      ctx.body = '404, not found'
    }
  }

  static async compose(ctx: Context) {
    console.log(ctx.params)
    // 
  }

  static async test(ctx: Context) {
    console.log('ctx.path: ', ctx.path.length, ctx.params)
    await Delay(5000)
    ctx.body = ctx.params.id.length
  }

}