import {getManager, getRepository, Like} from "typeorm";
import { Context } from '@core/koa'
import { Article } from '../entities/article'
import { Guid } from "../utils/tools";
import * as ChatModel from '../models/Chat'


export default class ArticleController {

  static async getAll() {
    return await getManager().find(Article);
  }


  static async getById(id: string) {
    const chat = await getRepository(Article).findOne({id})
    return chat
  }

  static async pages(args: any) {
    const pages = await getManager()
      .createQueryBuilder()
      .where({
        username: Like(args.username)
      })
      .orderBy({
        created_at: 'DESC'
      })
      .offset(args.cur_page)
      .limit(args.page_size || 20);
    return pages
  }

  static async insert(args: any, ctx: Context) {
    console.log('ctx.ip:', ctx.ip, ctx.ips)
    let guid = Guid()
    let model = new ChatModel.Chat()
    model.message = args.message
    model.ip = ctx.ip
    model.username = '用户' + guid.substring(10,15)
    model.created_by = guid
    const result = await getRepository(Article).save(model)
    console.log('result:', result)
    return result
  }

}