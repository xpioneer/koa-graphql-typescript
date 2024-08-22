import * as Koa from 'koa'
import {
  getMongoManager, getMongoRepository,
  Like,
  Between,
  FindManyOptions,
  Equal,
  MongoRepository,
} from 'typeorm';
// import { Context } from '@/core/koa'
import { API } from '../entities/mongo/api'
import { Errors } from '../entities/mongo/errors'
import { Guid } from '../utils/tools';
import { CONNECT_MONGO, useMongoRepository } from '../database/dbUtils'
import { formatDate } from '../utils/tools';
import { DateFormat } from '../types/base';


// const mongoRepos = useMongoRepository()

export default class LogsController {
  
  mongoDB: MongoRepository<API>

  constructor(){
    this.mongoDB = useMongoRepository()(API)
  }


  static async getById(id: string = '') {
    const api = await getMongoRepository(API, CONNECT_MONGO).findOne({
      where: {
        id,
      }
    })
    // const api = await mongoRepos(API).findOne({where: {id: Equal(id)}})
    return api
  }

  static async apiPages(ctx: Koa.Context) {
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
      options.where = {
        path: query.path as string
      }
      // options.where['path'] = query.path
    }
    if(query.url) {
      options.where = {
        url: query.url as string
      }
      // options.where['url'] = query.url
    }
    const pages = await getMongoRepository('API', CONNECT_MONGO).findAndCount(options)
    const [list, total] = pages
    ctx.Pages({list, total})
  }

  static async errorsPages(ctx: Koa.Context) {
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
      options.where = {
        path: query.path as string
      }
      // options.where['path'] = query.path
    }
    if(query.url) {
      options.where = {
        url: query.url as string
      }
      // options.where['url'] = query.url
    }
    const pages = await getMongoRepository('Errors', CONNECT_MONGO).findAndCount(options)
    const list = pages[0], total = pages[1]
    ctx.Pages({list, total})
  }

  // api log insert
  static async APIlogger (ctx: Koa.Context, options: any): Promise<void> {
    if(!/^\/api\/log-(api|errors)$/.test(ctx.path)) {
      const guid = Guid()
      const model = new API()
      const method = ctx.method
      model.id = guid
      model.ip = ctx.header['x-real-ip'] as string || ctx.req.socket.remoteAddress,
      model.path = ctx.path
      model.url = ctx.url
      model.status = ctx.status
      model.origin = ctx.origin
      model.hostname = ctx.header['x-host'] as string;
      model.headers = ctx.header
      model.resHeaders = ctx.response.header
      model.resData = ctx.body
      model.protocol = ctx.protocol;
      model.createdAt = formatDate(new Date, DateFormat.DateTimeS)
      model.createdBy = ctx.state['CUR_USER'] ? ctx.state['CUR_USER'].id : model.ip

      model.method = method
      if(method === 'GET') {
        model.params = ctx.querystring
      } else if(/^P(U|OS)T$/.test(method)){
        if(/^\/api\/login$/.test(ctx.path)){
          let params = ctx.fields;
          params['password'] = '******';
        }
        model.params = ctx.fields
      }

      model.time = options.time  // deal time
      const mongoRepos = useMongoRepository()
      console.log('loggin....>>>>', model)
      const result = await mongoRepos(API).save(model)
      console.log('result....>>>>', result)
      // const result = await getMongoManager(CONNECT_MONGO).save(model)
    }

  }

  // errors log insert
  static async ERRlogger (ctx: Koa.Context, options: any): Promise<void> {
    const guid = Guid()
    const model = new Errors()
    const method = ctx.method
    model.id = guid
    model.ip = ctx.header['x-real-ip'] as string || ctx.req.socket.remoteAddress,
    model.path = ctx.path
    model.url = ctx.url
    model.origin = ctx.origin
    model.hostname = ctx.header['x-host'] as string;
    model.headers = String(ctx.header)
    model.resHeaders = ctx.response.header
    model.resData = ctx.body
    model.protocol = ctx.protocol;
    model.createdAt = formatDate(new Date, DateFormat.DateTimeS)
    model.createdBy = ctx.state['CUR_USER'] ? ctx.state['CUR_USER'].id : model.ip

    model.status = options.status
    model.errors = options.errors
    model.msg = options.msg

    model.method = method
    if(method === 'GET') {
      model.params = ctx.querystring
    } else if(/^P(U|OS)T$/.test(method)){
      if(/^\/api\/login$/.test(ctx.path)){
        let params = ctx.fields;
        params['password'] = '******';
      }
      model.params = ctx.fields
    }

    model.time = options.time  // deal time
    const mongoRepos = useMongoRepository()
    const result = await mongoRepos(Errors).save(model)
    // const result = await getMongoRepository(Errors, CONNECT_MONGO).save(model)
  }

}