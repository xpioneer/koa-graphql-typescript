import * as Koa from 'koa'
import {
  getMongoManager, getMongoRepository,
  Like,
  Between,
  FindManyOptions,
  Equal,
  MongoRepository,
  DataSource,
} from 'typeorm';
// import { Context } from 'koa'
import { API } from '../entities/mongo/api'
import { Errors } from '../entities/mongo/errors'
import { Guid } from '../utils/tools';
import { CONNECT_MONGO, useMongoRepository } from '../database/dbUtils'
import { formatDate } from '../utils/tools';
import { DateFormat } from '../types/base';
import LogsService from '@/services/LogsService'

class LogsController {

  private dataRedaction(ctx: Koa.Context, model: API | Errors) {
    const RedactionUrl = /^\/api\/(login|register)$/
    const method = ctx.method
    model.method = method
    if(method === 'GET') {
      model.params = ctx.querystring
    } else if(/^P(U|OS)T$/.test(method)){
      if(RedactionUrl.test(ctx.path)){
        let params = ctx.fields;
        params['password'] = '******';
      }
      model.params = ctx.fields
    }
  }

  private setCommonData(ctx: Koa.Context, model: API | Errors) {
    const guid = Guid()
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

    this.dataRedaction(ctx, model)
  }

  async getById(id: string = '') {
    const api = await useMongoRepository(API).findOne({
      where: {
        id: Equal(id),
      }
    })
    return api
  }

  async apiPages(ctx: Koa.Context) {
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
    const pages = await useMongoRepository(API).findAndCount(options)
    const [list, total] = pages
    ctx.Pages({list, total})
  }

  async errorsPages(ctx: Koa.Context) {
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
    const pages = await useMongoRepository(Errors).findAndCount(options)
    const list = pages[0], total = pages[1]
    ctx.Pages({list, total})
  }

  // api log insert
  async APIlogger (ctx: Koa.Context, options: any): Promise<void> {
    if(!/^\/api\/log-(api|errors)$/.test(ctx.path)) {
      const model = new API()
      this.setCommonData(ctx, model)

      model.time = options.time  // deal time
      const result = await useMongoRepository(API).save(model)
    }

  }

  // errors log insert
  async ERRlogger (ctx: Koa.Context, options: any): Promise<void> {
    const model = new Errors()
    this.setCommonData(ctx, model)

    // errors special data
    model.status = options.status
    model.errors = options.errors
    model.msg = options.msg

    model.time = options.time  // deal time
    const result = await useMongoRepository(Errors).save(model)
  }

  async stats (ctx: Koa.Context) {
    const data = await LogsService.getStats()
    return ctx.Json(data)
  }

}

export default new LogsController()
