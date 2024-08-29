import {
  Like,
  Between,
  FindManyOptions,
  Equal
} from "typeorm";
import { Context } from 'koa'
import { LeaveMessage } from '../entities/mysql/leaveMessage'
import { Guid } from "../utils/tools";
import { endOfDay, startOfDay } from 'date-fns'
import { useBlogRepository } from '../database/dbUtils';


class LeaveMessageController {

  getAll(args: any) {
    return useBlogRepository(LeaveMessage).findAndCount();
  }


  getById(id = '') {
    const leaveMsg = useBlogRepository(LeaveMessage).findOne({
      where: {
        id: Equal(id)
      }
    })
    return leaveMsg
  }

  pages(args: any) {
    const options: FindManyOptions<LeaveMessage> = {
      skip: args.page < 2 ? 0 : (args.page - 1) * args.pageSize,
      take: args.pageSize,
      order: {},
      where: {
        deletedAt: null
      },
      select: ['id', 'description', 'createdAt', 'createdBy', 'updatedAt'],
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
    const pages = useBlogRepository(LeaveMessage).findAndCount(options)
    return pages
  }

}

export default new LeaveMessageController