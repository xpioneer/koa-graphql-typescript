import {getManager, getRepository, Like} from "typeorm";
import { Context } from '@core/koa'
import { Tag } from '../entities/mysql/tag'
import { Guid } from "../utils/tools";


export default class TagController {

  static async getAll(args: any) {
    console.log(args)
    return await getManager().find(Tag);
  }


  static async getById(id: string = '') {
    const tag = await getRepository(Tag).findOne({id})
    return tag
  }

  static async pages(args: any) {
    const pages = await getRepository(Tag)
      .createQueryBuilder()
      .orderBy({createdAt: 'DESC'})
      .skip(args.page < 2 ? 0 : (args.page - 1) * args.pageSize)
      .take(args.pageSize)
      .getManyAndCount()
    return pages
  }

  static async insert(args: any, ctx: Context) {
    // console.log('ctx.ip:', ctx.ip, ctx.ips)
    // let guid = Guid()
    // let model = new ChatModel.Chat()
    // model.message = args.message
    // model.ip = ctx.ip
    // model.username = '用户' + guid.substring(10,15)
    // model.created_by = guid
    // const result = await getRepository(Tag).save(model)
    // console.log('result:', result)
    return {}
  }

}