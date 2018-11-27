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
    let guid = Guid()
    let model = new Article()
    model.id = Guid()
    model.title = args.title
    model.abstract = args.abstract
    model.description =  args.description//'用户' + guid.substring(10,15)
    model.typeId = args.typeId
    model.isTop = args.isTop
    model.tag = args.tag
    model.createdBy = guid
    model.createdAt = Date.now()
    model.updatedBy = guid
    model.updatedAt = Date.now()
    const result = await getRepository(Article).save(model)
    return result
  }

}