import {getManager, getRepository, Like} from "typeorm";
import { Context } from '@core/koa'
import { Comment } from '../entities/mysql/comment'
import { Guid } from "../utils/tools";
import * as ChatModel from '../models/Chat'


export default class CommentController {

  static async getAll(args: any) {
    return await getManager().find(Comment);
  }


  static async getById(id: string = '') {
    const article = await getRepository(Comment).findOne({id})
    return article
  }

  static async pages(args: any) {
    console.log(args, 'query args ===================')
    console.log(args.title, 'args.title')
    const pages = await getRepository('comment')
      .createQueryBuilder()
      .orderBy({created_at: 'DESC'})
      .skip(args.page < 0 ? 0 : args.page)
      .take(args.page_size)
      .getManyAndCount()
    console.log(pages[0].length, pages[1])
    return pages
  }

}