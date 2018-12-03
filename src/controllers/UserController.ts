import {getManager, getRepository, Like} from "typeorm";
import { Context } from '@core/koa'
import { User } from '../entities/mysql/user'
import { Guid } from "../utils/tools";


export default class UserController {

  static async getAll(args: any) {
    return await getManager().find(User);
  }


  static async getById(id: string = '') {
    const article = await getRepository(User).findOne({id})
    // console.log('article: ', article)
    return article
  }

  static async pages(args: any) {
    console.log(args, 'query args ===================')
    const pages = await getRepository(User)
      .createQueryBuilder()
      .orderBy({createdAt: 'DESC'})
      .skip(args.page < 2 ? 0 : (args.page - 1) * args.pageSize)
      .take(args.pageSize)
      .getManyAndCount()
    // console.log(pages[0].length, pages[1])
    return pages
  }

  static async insert(args: any, ctx: Context) {
    let guid = Guid()
    let model = new User()
    model.id = Guid()
    model.username = args.username
    model.nickName = args.nickName
    model.remark =  args.remark
    model.sex =  args.sex
    model.createdBy = guid
    model.createdAt = Date.now()
    model.updatedBy = guid
    model.updatedAt = Date.now()
    const result = await getRepository(User).save(model)
    return result
  }

  static async update(args: any, ctx: Context) {
    // let guid = Guid()
    const user = new User
    user.nickName = args.nickName
    user.sex = args.sex
    user.remark =  args.remark
    // model.updatedBy = guid
    user.updatedAt = Date.now()
    const result = await getRepository(User).update(user, {id: args.id})
    console.log('----result', result)
    return result
  }

}