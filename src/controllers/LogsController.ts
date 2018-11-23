import {getMongoManager, getMongoRepository, Like, Between, FindManyOptions, Equal} from "typeorm";
import * as Moment from 'moment'
import { Context } from '@core/koa'
import { API } from '../entities/mongo/api'
import { Errors } from '../entities/mongo/errors'
import { Guid } from "../utils/tools";
import * as ChatModel from '../models/Chat'


export default class LogsController {


  static async getById(id: string = '') {
    const api = await getMongoRepository(API, 'mongo').findOne({id})
    // console.log('api: ', api)
    return api
  }

  static async apiPages(ctx: Context) {
    const params = ctx.getParams
    const query = ctx.query
    
    const options: FindManyOptions<API> = {
      skip: params.offset,
      take: params.limit,
      order: {
        createdAt: 'DESC'
      },
      where: {}
    }
    if(query.path) {
      // const dateRange = query.createdAt.split(',').map((d: string) => Moment(d).format('YYYY/MM/DD HH:mm:ss.SSS'))
      options.where['path'] = query.path
    }
    if(query.url) {
      options.where['url'] = query.url
    }
    const pages = await getMongoRepository('API', 'mongo').findAndCount(options)
    ctx.Pages({page: pages})
  }

  static async errorsPages(ctx: Context) {
    const params = ctx.getParams
    const query = ctx.query
    
    const options: FindManyOptions<Errors> = {
      skip: params.offset,
      take: params.limit,
      order: {
        createdAt: 'DESC'
      },
      where: {}
    }
    if(query.path) {
      options.where['path'] = query.path
    }
    if(query.url) {
      options.where['url'] = query.url
    }
    const pages = await getMongoRepository('Errors', 'mongo').findAndCount(options)
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