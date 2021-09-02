import { Equal, Like, Between, FindManyOptions, FindConditions} from "typeorm";
import { Context } from '@core/koa'
import { Stock } from '../entities/mysql/shares/stock'
import { EMarket, EBLock } from '../models/Stocks'
import { getSharesManager, getSharesRepository } from '../database/dbUtils';



class StockDao {


  async getCode(id: number) {
    const stock = await getSharesRepository(Stock).findOne({id})
    return stock
  }

  async getById(id: number) {
    const stock = await getSharesRepository(Stock).findOne(id, {
      select: ['id', 'code', 'name']
    })
    return stock
  }

  async getByIds(ids: number[]) {
    const stocks = await getSharesRepository(Stock).findByIds(ids, {
      select: ['id', 'code', 'name']
    })
    return stocks
  }

  async getByCode(code: string) {
    const stock = await getSharesRepository(Stock).findOne({code})
    return stock
  }

  async getStockList(value: string, pageSize = 10) {
    const list = await getSharesRepository(Stock).find({
      where: [
        { code: Like(`%${value}%`) },
        { name: Like(`%${value}%`) }
      ],
      order: {
        code: 'DESC'
      },
      take: pageSize
    })
    return list
  }

  async pages(offset = 1, size = 10, code?: string, name?: string, market?: EMarket, block?: EBLock) {
    const where: FindConditions<Stock> = {}
    if(code) {
      where.code = Like(`%${code}%`)
    }
    if(name) {
      where.name = Like(`%${name}%`)
    }
    if(market) {
      where.market = Equal(market)
    }
    if(block) {
      where.block = Equal(block)
    }
    const options: FindManyOptions<Stock> = {
      skip: (offset > 0 ? (offset - 1) : 0) * size,
      take: size,
      order: { id: 'ASC'},
      where
    }
    const pages = await getSharesRepository(Stock).findAndCount(options)
    return pages
  }
}

export default new StockDao