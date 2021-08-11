import { Equal, Like, Between, FindManyOptions} from "typeorm";
import { Context } from '@core/koa'
import { Stock } from '../entities/mysql/shares/stock'
import { Guid } from "../utils/tools";
import { getSharesManager, getSharesRepository } from '../database/dbUtils';
import $http from '../utils/http'
import StockService from '../services/StockService'
import { Stock_Name_Origin, Stock_Name_API_Host, Stock_Name_API_Url, UA } from '../../conf/api.conf'

interface IStockKLineResponse {
  code: string
  name: string
  klines: string[]
}

enum EBLock {
  主板 = 1,
  创业板,
  科创板
}

const requestApi = async(code: string) => {
  const params = {
    secid: code,
    klt: 101,
    fqt: 1,
    lmt: 1,
    end: 20500000,
    iscca: 1,
    fields1: 'f1,f2,f3,f4,f5,f6,f7,f8',
    fields2: 'f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61,f62,f63,f64',
    ut: 'f057cbcbce2a86e2866ab8877db1d059',
    forcect: 1,
  }
  const url = `https://${Stock_Name_API_Host}${Stock_Name_API_Url}`
  const result = await $http.get(url, {
    params,
    headers: {
      'Host': `${Stock_Name_API_Host}`,
      'Origin': `https://${Stock_Name_Origin}`,
      'Referer': `https://${Stock_Name_Origin}`,
      'User-Agent': UA
    }
  });
  const _data: IStockKLineResponse = result.data || {}
  return {
    code: _data.code,
    name: _data.name
  }
}



class StockController {

  async getByCode(code: string) {
    const stock = await getSharesRepository(Stock).findOne({code})
    return stock
  }

  async pages1(ctx: Context) {
    const { page = 1, pageSize = 10, code, name, market, block } = ctx.query
    const [list, total] = await StockService.pages(page, pageSize, code, name, market, block)
    ctx.Pages({ list, total })
  }

  async pages(delta = 0, size = 10) {
    const options: FindManyOptions<Stock> = {
      skip: delta * size,
      take: size,
      order: { id: 'ASC'},
      where: {}
    }
    const pages = await getSharesRepository(Stock).findAndCount(options)
    return pages
  }

  async getList(delta = 0, size = 100) {
    const options: FindManyOptions<Stock> = {
      skip: delta * size,
      take: size,
      order: { id: 'ASC'},
      where: {}
    }
    const stocks = await getSharesRepository(Stock).find(options)
    return stocks
  }

  async batchInsert(ctx: Context) {
    const delta = 900
    
    const arr = Array(100).fill(0).map((v, i) => {
      return `1.688${(i + delta).toString().padStart(3, '0')}`
    })

    const pro = arr.map(requestApi)

    const dcRes = await Promise.all(pro)
    const result = dcRes.filter(d => d.code)
    console.log('result:', result.length)
    // ctx.Json({data: result})

    const insertDatas = result.map(StockController.add)
    const _insertRes = await Promise.all(insertDatas)
    ctx.Json({data: _insertRes})
  }

  async insert(ctx: Context) {
    const { code, name } = ctx.query
    let model = new Stock()
    model.uuid = Guid()
    model.code = code
    model.name = name
    model.market = 2
    model.block = 2
    model.amount = 100
    const result = await getSharesManager().save(model)
    ctx.Json({data: result})
  }

  static async add(data: {code: string, name: string}) {
    const { code, name } = data
    let model = new Stock()
    model.uuid = Guid()
    model.code = code
    model.name = name
    model.market = 1
    model.block = 3
    model.amount = 200
    const result = await getSharesManager().save(model)
    return result
  }

}

export default new StockController