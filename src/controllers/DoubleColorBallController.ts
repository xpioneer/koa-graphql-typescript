import {getManager, getRepository, Equal, Like, Between, FindManyOptions} from "typeorm";
import { Context } from '@core/koa'
import { Balls } from '../entities/mysql/balls'
import { Guid } from "../utils/tools";

export default class DoubleColorBallController {

  static async getById(id: string = '') {
    const result = await getRepository(Balls).find({id})
    return result
  }

  static async pages(args: any) {
    // console.log(args)
    // delete args.createdAt // delete createdAt
    const options: FindManyOptions<Balls> = {
      skip: args.page < 2 ? 0 : (args.page - 1) * args.pageSize,
      take: args.pageSize,
      order: {'drawDate': 'DESC'},
      where: {
        deletedAt: null
      }
    }
    if(args.issue) {
      const issue = args.issue.split(',')
      options.where['issue'] = Between(issue[0], issue[1])
    }
    if(args.drawDate) {
      const date = args.drawDate.map((c: string) => (new Date(c)).valueOf())
      options.where['drawDate'] = Between(date[0], date[1])
    }
    if(args.order) {
      options.order = Object.assign(options.order, args.order)
    }
    console.log(options, '----options')

    const pages = await getRepository(Balls).findAndCount(options)
    return pages
  }

  static async insert(args: any, ctx: Context) {
    const ball = await getRepository(Balls).findOne({issue: args.issue})
    if(ball) {
      ctx.throw(500, '该期号已存在')
    }
    let model = new Balls()
    model.id = Guid()
    model.issue = args.issue
    model.red1 = args.reds[0]
    model.red2 = args.reds[1]
    model.red3 = args.reds[2]
    model.red4 = args.reds[3]
    model.red5 = args.reds[4]
    model.red6 = args.reds[5]
    model.blue = args.blue
    // model.happySun = args.happySun
    model.pool = args.pool
    model.prizeOne = args.prizeOne
    model.prizeOneNum = args.prizeOneNum
    model.prizeTwo = args.prizeTwo
    model.prizeTwoNum = args.prizeTwoNum
    model.bettingNum = args.bettingNum
    model.drawDate = new Date(args.drawDate).getTime()
    model.createdBy = ctx.state['CUR_USER'].id
    model.createdAt = Date.now()
    model.updatedBy = ctx.state['CUR_USER'].id
    model.updatedAt = Date.now()
    const result = await getRepository(Balls).save(model)
    return result
  }

  static async update(args: any, ctx: Context) {
    const ball = await getRepository(Balls).findOne({id: args.id})
    if(!ball) {
      ctx.throw(500, '该期号不存在')
    }
    let model = new Balls()
    model.issue = args.issue
    model.red1 = args.reds[0]
    model.red2 = args.reds[1]
    model.red3 = args.reds[2]
    model.red4 = args.reds[3]
    model.red5 = args.reds[4]
    model.red6 = args.reds[5]
    model.blue = args.blue
    model.pool = args.pool
    model.prizeOne = args.prizeOne
    model.prizeOneNum = args.prizeOneNum
    model.prizeTwo = args.prizeTwo
    model.prizeTwoNum = args.prizeTwoNum
    model.bettingNum = args.bettingNum
    model.drawDate = new Date(args.drawDate).getTime()
    model.updatedBy = ctx.state['CUR_USER'].id
    model.updatedAt = Date.now()
    const result = await getRepository(Balls).update({id: args.id}, model)
    console.log(result, '-----------result')
    return result
  }

}