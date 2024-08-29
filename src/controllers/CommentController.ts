import { Like, Between, FindManyOptions, Equal} from "typeorm";
import { Context } from 'koa'
import { Comment } from '../entities/mysql/comment'
import { Guid } from "../utils/tools";
import { endOfDay, startOfDay } from 'date-fns'
import { useBlogRepository } from '../database/dbUtils';

class CommentController {

  getAll(args: any) {
    return useBlogRepository(Comment).findAndCount();
  }


  getById(id = '') {
    const article = useBlogRepository(Comment).findOne({
      where: {
        id: Equal(id)
      }
    })
    return article
  }

  pages(args: any) {
    const options: FindManyOptions<Comment> = {
      skip: args.page < 2 ? 0 : (args.page - 1) * args.pageSize,
      take: args.pageSize,
      order: {},
      where: {
        deletedAt: null
      },
      select: ['id', 'description', 'articleId', 'client', 'createdAt', 'createdBy', 'updatedAt']
    }
    if(args.description) {
      options.where['description'] = Like(`%${args.description}%`)
    }
    if(args.createdAt) {
      const date = (args.createdAt as string[]).map(
        (d, i) => i > 0 ? +endOfDay(new Date(d)) : +startOfDay(new Date(d))
      )
      options.where['createdAt'] = Between(date[0], date[1])
    }
    if(args.order) {
      options.order = Object.assign(options.order, args.order)
    }
    const pages = useBlogRepository(Comment).findAndCount(options)
    return pages
  }

}

export default new CommentController
