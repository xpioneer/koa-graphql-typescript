import * as Koa from 'koa'
import {
  Like,
  Between,
  FindManyOptions,
  Equal,
  FindOptionsWhere,
} from 'typeorm';
// import { Context } from 'koa'
import { SystemLog } from '../entities/mysql/systemLog'
// import { Errors } from '../entities/mongo/errors'
// import { Guid } from '../utils/tools';
import { useBlogRepository } from '../database/dbUtils'
import { formatDate } from '../utils/tools';
import { DateFormat } from '../types/base';
import GeoLogService from '@/services/GeoLogService'
import { endOfDay, startOfDay } from 'date-fns'

class GeoLogController {

  async pages(ctx: Koa.Context) {
    const params = ctx.getParams
    const query = ctx.query
    
    const options: FindManyOptions<SystemLog> = {
      skip: params.offset,
      take: params.limit,
      order: {
        created_at: 'DESC'
      },
      where: {}
    }
    const whereConditions: FindOptionsWhere<SystemLog> = {}
    if(query.path) {
      whereConditions.path = Like(`%${query.path}%`)
    }
    if(query.continent_code) {
      whereConditions.continent_code = Like(`%${query.continent_code}%`)
    }
    if(query.msg) {
      whereConditions.msg = Like(`%${query.msg}%`)
    }
    if(query['createdAt[]']) {
      const date = (query['createdAt[]'] as string[]).map(
        (d, i) => i > 0 ? endOfDay(new Date(d)) : startOfDay(new Date(d))
      );
      (whereConditions as any).created_at = Between(date[0], date[1])
      // (whereConditions as any).created_at = {
      //   $gte: date[0],  // 大于等于开始日期
      //   $lte: date[1]     // 小于等于结束日期
      // }
    }
    options.where = whereConditions
    console.log(options.where.created_at, '----options')
    const pages = await useBlogRepository(SystemLog).findAndCount(options)
    const list = pages[0], total = pages[1]
    ctx.Pages({list, total})
  }

  async dayStats (ctx: Koa.Context) {
    const data = await GeoLogService.getEveryDay()
    return ctx.Json(data)
  }


  async getGeographicStats(ctx: Koa.Context) {
    
  }

}

export default new GeoLogController()
