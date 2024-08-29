import {
  Like,
  Between,
  FindManyOptions,
  Equal,
  LessThan,
  MoreThan,
  IsNull,
  FindOptionsWhere
} from "typeorm";
import { Context } from 'koa'
import { ArticleType } from '../entities/mysql/articleType'
import { Guid } from "../utils/tools";
import { endOfDay, startOfDay } from 'date-fns'
import { useBlogRepository } from '../database/dbUtils';


class ArticleTypeController {

  async getAll(args: any) {
    return await useBlogRepository(ArticleType).findAndCount();
  }


  async getById(id: string = '') {
    const articleType = await useBlogRepository(ArticleType).findOne({
      where: {
        id: Equal(id)
      },
      select: ['id', 'name', 'remark', 'createdAt', 'updatedAt']
    })
    return articleType
  }

  async pages(args: any) {
    const options: FindManyOptions<ArticleType> = {
      skip: args.page < 2 ? 0 : (args.page - 1) * args.pageSize,
      take: args.pageSize,
      order: {},
      where: {
        deletedAt: null
      }
    }
    const whereConditions: FindOptionsWhere<ArticleType> = {
      deletedAt: IsNull(),
    }
    if(args.name) {
      whereConditions.name = Like(`%${args.name}%`)
    }
    if(args.createdAt) {
      const date = (args.createdAt as string[]).map(
        (d, i) => i > 0 ? +endOfDay(new Date(d)) : +startOfDay(new Date(d))
      )
      whereConditions.createdAt = Between(date[0], date[1])
    }
    if(args.order) {
      options.order = Object.assign(options.order, args.order)
    }
    options.where = whereConditions
    console.log(args, '----options')
    const pages = await useBlogRepository(ArticleType).findAndCount(options)
    return pages
  }

  async insert(args: any, ctx: Context) {
    let model = new ArticleType()
    model.id = Guid()
    model.name = args.name
    model.remark = args.remark
    model.createdAt = Date.now()
    model.createdBy = ctx.state['CUR_USER'].id
    model.updatedAt = Date.now()
    model.updatedBy = ctx.state['CUR_USER'].id
    const result = await useBlogRepository(ArticleType).save(model)
    return result
  }
  
  async save(args: any, ctx: Context) {
    let model = new ArticleType()
    model.id = Guid()
    if(args.id) {
      model.id = args.id
    } else {
      model.createdAt = Date.now()
      model.createdBy = ctx.state['CUR_USER'].id
    }
    model.name = args.name
    model.remark = args.remark
    model.updatedAt = Date.now()
    model.updatedBy = ctx.state['CUR_USER'].id
    const result = await useBlogRepository(ArticleType).save(model)
    console.log('result:', result)
    return result
  }

}

export default new ArticleTypeController