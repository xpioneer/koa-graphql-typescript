import {getManager, getRepository, Like} from "typeorm";
import { Context } from '@core/koa'
import { Article } from '../entities/mysql/article'
import { Guid } from "../utils/tools";
import * as ChatModel from '../models/Chat'


export default class ArticleController {

  static async getAll(args: any) {
    console.log(args)
    return await getManager().find(Article);
  }


  static async getById(id: string = '') {
    const article = await getRepository(Article).findOne({id})
    // console.log('article: ', article)
    return article
  }

  static async pages(args: any) {
    console.log(args, 'query args ===================')
    console.log(args.title, 'args.title')
    const pages = await getRepository(Article)
      .createQueryBuilder()
      .orderBy({createdAt: 'DESC'})
      .skip(args.page < 0 ? 0 : (args.page - 1) * args.pageSize)
      .take(args.pageSize)
      .getManyAndCount()
    // console.log(pages[0].length, pages[1])
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