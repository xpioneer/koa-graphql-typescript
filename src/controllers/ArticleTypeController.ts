import {getManager, getRepository, Like, Equal} from "typeorm";
import { Context } from '@core/koa'
import { ArticleType } from '../entities/mysql/articleType'
import { Guid } from "../utils/tools";


export default class ArticleController {

  static async getAll(args: any) {
    return await getManager().find(ArticleType);
  }


  static async getById(id: string = '') {
    // getManager().findOne()
    const articleType = await getRepository(ArticleType).findOne({id})
    return articleType
  }

  static async pages(args: any) {
    const pages = await getRepository('articleType')
      .createQueryBuilder()
      .orderBy({createdAt: 'DESC'})
      .offset(args.page < 2 ? 0 : (args.page - 1) * args.pageSize)
      .limit(args.pageSize)
      .getManyAndCount()
    // console.log(pages[0].length, pages[1])
    return pages
  }

  static async insert(args: any, ctx: Context) {
    let model = new ArticleType()
    model.name = args.name
    model.remark = args.remark
    const result = await getRepository(ArticleType).save(model)
    console.log('result:', result)
    return result
  }

}