import * as Koa from 'koa'
import {
  Like,
  Between,
  FindManyOptions,
  Equal,
  FindOptionsWhere,
} from 'typeorm';
// import { Context } from 'koa'
import { API } from '../entities/mongo/api'
import { Errors } from '../entities/mongo/errors'
import { Guid } from '../utils/tools';
import { useMongoRepository } from '../database/dbUtils'
import { formatDate } from '../utils/tools';
import { DateFormat } from '../types/base';
import LogsService from '@/services/LogsService'
import { endOfDay, startOfDay } from 'date-fns'

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
    model.createdAt = new Date
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
    const whereConditions: FindOptionsWhere<Errors> = {}
    if(query.path) {
      whereConditions.path = Like(`%${query.path}%`)
    }
    if(query.url) {
      whereConditions.url = Like(`%${query.url}%`)
    }
    if(query.msg) {
      whereConditions.msg = Like(`%${query.msg}%`)
    }
    if(query['createdAt[]']) {
      const date = (query['createdAt[]'] as string[]).map(
        (d, i) => i > 0 ? endOfDay(new Date(d)) : startOfDay(new Date(d))
      );
      // (whereConditions as any).createdAt = Between(date[0], date[1])
      (whereConditions as any).createdAt = {
        $gte: date[0],  // 大于等于开始日期
        $lte: date[1]     // 小于等于结束日期
      }
    }
    options.where = whereConditions
    console.log(options.where.createdAt, '----options')
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
