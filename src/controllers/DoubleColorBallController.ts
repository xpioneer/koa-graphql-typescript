import {getManager, getRepository, Equal, Like, Between, FindManyOptions} from "typeorm";
import { Context } from '@core/koa'
import { Balls } from '../entities/mysql/balls'
import { Guid } from "../utils/tools";

export default class DoubleColorBallController {

  static async getById(id: string = '') {
    const result = await getRepository(Balls).findOne({id})
    console.log(result, 'getById')
    return result
  }

  static async deleteById(id: string = '', ctx: Context) {
    const result = await getRepository(Balls).update({id}, {
      deletedAt: Date.now(),
      deletedBy: ctx.state['CUR_USER'].id,
    })
    console.log(result, '--------delete')
    if(result.raw.affectedRows) {
      return true
    } else {
      return false
    }
  }

  static async pages(args: any) {
    // console.log(args)
    delete args.order.createdAt // delete createdAt
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
      ctx.throw(500, '该期不存在')
    }
    const reds = args.reds
    let model = new Balls()
    model.issue = args.issue
    model.red1 = reds[0]
    model.red2 = reds[1]
    model.red3 = reds[2]
    model.red4 = reds[3]
    model.red5 = reds[4]
    model.red6 = reds[5]
    model['r' + reds[0]] = 1
    model['r' + reds[1]] = 1
    model['r' + reds[2]] = 1
    model['r' + reds[3]] = 1
    model['r' + reds[4]] = 1
    model['r' + reds[5]] = 1
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
    if(result.raw.affectedRows) {
      return true
    } else {
      return false
    }
  }

  static async allBallCount() {
    let redList:any = [], _redDisList = []
    for(let i = 1; i <= 6; i++) {
      const list = await getRepository(Balls)
        .createQueryBuilder('ball')
        .select(`COUNT(ball.red${i})`, 'total')
        .addSelect(`red${i}`)
        .groupBy(`red${i}`)
        .getRawMany()
      redList = [...redList, ...list.map(v => {
        return { total: v.total, ball: v[`red${i}`] }
      })]
      _redDisList.push(list.map(v => ({total: +v.total, ball: v[`red${i}`]})))
    }
    let reds:any = []
    redList.forEach((v: {[key: string]: any}) => {
      let r = reds.filter((v1: {[key: string]: any}) => v1.ball === v.ball)
      if(r.length === 1) {
        r[0].total = r[0].total + 1*v.total
      } else {
        reds.push({ball: v.ball, total: +v.total})
      }
    })
    let blues:any = []
    const list = await getRepository(Balls)
      .createQueryBuilder('ball')
      .select('COUNT(ball.blue)', 'total')
      .addSelect('blue')
      .groupBy('blue')
      .getRawMany()
    blues = list.map(v => ({ total: v.total, ball: +v['blue'] }))
    // 补充
    let $redDisList = JSON.parse(JSON.stringify(_redDisList)), redDisList: any[] = []
    $redDisList.forEach((item: [{[key: string]: any}], index: number) =>{
      let _item = []
      for(let i = 1; i <= 33; i++) {
        let redBall = item.filter(b => b.ball === i)[0]
        _item[i - 1] = {ball: i, total: redBall ? redBall.total : 0}
      }
      redDisList[index] = _item
    })
    
    return {
      reds,
      blues,
      redDisList
    }
  }

}