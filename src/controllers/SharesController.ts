import { Equal, Like, Between, FindManyOptions} from "typeorm";
import { Context } from 'koa'
import { GJRecord } from '../entities/mysql/shares/GJRecord'
import { Guid } from "../utils/tools";
import { endOfDay, startOfDay } from 'date-fns'
import { useSharesRepository } from '../database/dbUtils';

type AnyObject<T = any> = Record<string, T>


class SharesController {

  async getAll(args: any) {
    console.log(args)
    return await useSharesRepository(GJRecord).find();
  }


  async getById(id = '') {
    const article = await useSharesRepository(GJRecord).findOne({
      where: {
        id
      }
    })
    // console.log('article: ', article)
    return article
  }

  async pages(args: AnyObject) {
    console.log(args, 'query args ===================')
    const options: FindManyOptions<GJRecord> = {
      skip: args.page < 2 ? 0 : (args.page - 1) * args.pageSize,
      take: args.pageSize,
      order: {},
      where: {
        deletedAt: null
      }
    }
    if(args.title) {
      options.where['title'] = Like(`%${args.title}%`)
    }
    if(args.abstract) {
      options.where['abstract'] = Like(`%${args.abstract}%`)
    }
    if(args.tag) {
      options.where['tag'] = Like(`%${args.tag}%`)
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
    console.log(options, '----options')

    const pages = await useSharesRepository(GJRecord).findAndCount(options)
      // .createQueryBuilder()
      // .where({
      //   // title: Like(args.title)
      // })
      // .orderBy({createdAt: 'DESC'})
      // .skip(args.page < 2 ? 0 : (args.page - 1) * args.pageSize)
      // .take(args.pageSize)
      // .cache(10000)
      // .getManyAndCount()
    // console.log(pages[0].length, pages[1])
    return pages
  }

  async batchInsert(ctx: Context) {
    
    const list = ctx.fields as GJRecord[]
    console.log(list)
    // ctx.Json<null>({ msg: ''})
  }

  async insert(args: AnyObject, ctx: Context) {
    let model = new GJRecord()
    model.id = Guid()
    model.tradeAt = args.tradeAt
    model.amount = args.amount
    model.price = args.price
    model.total =  args.total
    model.code = args.code
    model.position = args.position
    model.name = args.name
    model.direction = args.direction
    model.createdBy = ctx.state['CUR_USER'].id
    model.createdAt = Date.now()
    model.updatedBy = ctx.state['CUR_USER'].id
    model.updatedAt = Date.now()
    const result = await useSharesRepository(GJRecord).save(model)
    return result
  }

  async update(args: AnyObject, ctx: Context) {
    const record = new GJRecord
    record.id = args.id
    record.tradeAt = args.tradeAt
    record.amount = args.amount
    record.price = args.price
    record.total =  args.total
    record.code = args.code
    record.position = args.position
    record.name = args.name
    record.direction = args.direction
    record.updatedAt = Date.now()
    record.updatedBy = ctx.state['CUR_USER'].id
    const result = await useSharesRepository(GJRecord).save(record)
    return result
  }

}

export default new SharesController