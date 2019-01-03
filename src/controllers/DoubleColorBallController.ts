import {getManager, getRepository, Equal, Like, Between, FindManyOptions} from "typeorm";
import { Context } from '@core/koa'
import { Balls } from '../entities/mysql/balls'
import { Guid } from "../utils/tools";
import * as Moment from 'moment'


export default class DoubleColorBallController {

  static async insert(args: any, ctx: Context) {
    let model = new Balls()
    model.id = Guid()
    model.orderId = args.orderId
    model.red1 = args.reds[0]
    model.red2 = args.reds[1]
    model.red3 = args.reds[2]
    model.red4 = args.reds[3]
    model.red5 = args.reds[4]
    model.red6 = args.reds[5]
    model.blue = args.blue
    model.happySun = args.happySun
    model.pool = args.pool
    model.prizeOne = args.prizeOne
    model.prizeOneNum = args.prizeOneNum
    model.prizeTwo = args.prizeTwo
    model.prizeTwoNum = args.prizeTwoNum
    model.bettingNum = args.bettingNum
    model.createdBy = ctx.state['CUR_USER'].id
    model.createdAt = new Date(args.createdAt).getTime()
    model.updatedBy = ctx.state['CUR_USER'].id
    model.updatedAt = new Date(args.createdAt).getTime()
    const result = await getRepository(Balls).save(model)
    return result
  }

}