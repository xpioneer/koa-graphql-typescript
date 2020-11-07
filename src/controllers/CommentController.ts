import { Like, Between, FindManyOptions} from "typeorm";
import { Context } from '@core/koa'
import { Comment } from '../entities/mysql/comment'
import { Guid } from "../utils/tools";
import * as Moment from 'moment'
import { getBlogManager, getBlogRepository } from '../database/dbUtils';

export default class CommentController {

  static async getAll(args: any) {
    return await getBlogManager().find(Comment);
  }


  static async getById(id: string = '') {
    const article = await getBlogRepository(Comment).findOne({id})
    return article
  }

  static async pages(args: any) {
    const options: FindManyOptions<Comment> = {
      skip: args.page < 2 ? 0 : (args.page - 1) * args.pageSize,
      take: args.pageSize,
      order: {},
      where: {
        deletedAt: null
      }
    }
    if(args.description) {
      options.where['description'] = Like(`%${args.description}%`)
    }
    if(args.createdAt) {
      const date = args.createdAt.map((c: string) => (Moment(c)).valueOf())
      options.where['createdAt'] = Between(date[0], date[1])
    }
    if(args.order) {
      options.order = Object.assign(options.order, args.order)
    }
    const pages = await getBlogRepository('comment').findAndCount(options)
    return pages
  }

}