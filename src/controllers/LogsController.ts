import {getMongoManager, getMongoRepository, Like} from "typeorm";
import { Context } from '@core/koa'
import { API } from '../entities/mongo/api'
import { Guid } from "../utils/tools";
import * as ChatModel from '../models/Chat'


export default class LogsController {


  static async getById(id: string = '') {
    const api = await getMongoRepository(API, 'mongo').findOne({id})
    // console.log('api: ', api)
    return api
  }

  static async pages(ctx: Context) {
    console.log(ctx.query, 'query args ===================')
    console.log(ctx.getParams(), 'args.title')
    const pages = await getMongoRepository(API, 'mongo').findAndCount()
    // console.log(pages, pages[0], pages[1])
    ctx.Pages({page: pages})
  }

  static async insert(args: any, ctx: Context) {
    // console.log('ctx.ip:', ctx.ip, ctx.ips)
    // let guid = Guid()
    // let model = new ChatModel.Chat()
    // model.message = args.message
    // model.ip = ctx.ip
    // model.username = '用户' + guid.substring(10,15)
    // model.created_by = guid
    // const result = await getMongoRepository(Article).save(model)
    // console.log('result:', result)
    return {}
  }

}