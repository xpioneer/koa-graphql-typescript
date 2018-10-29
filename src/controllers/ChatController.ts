import {getManager, getRepository} from "typeorm";
import { Context } from '@core/koa'
import { Chat } from '../entities/qixi'

export default class ChatController {

  static async getAll(ctx: any) {
    const list = await getManager().find(Chat);
    return ctx.Json(list)
  }


  static async getById(ctx: Context) {
    const id = ctx.params.id;
    const chat = await getRepository(Chat).findOne({id})
    ctx.Json({data: chat});
  }

}