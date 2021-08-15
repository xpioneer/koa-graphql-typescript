import { Equal, Like, Between, FindManyOptions, FindConditions} from "typeorm";
import { Context } from '@core/koa'
import { Stock } from '../entities/mysql/shares/stock'
import { EMarket, EBLock } from '../models/Stocks'
import { getSharesManager, getSharesRepository } from '../database/dbUtils';



class StockDao {

  async getByCode(code: string) {
    const stock = await getSharesRepository(Stock).findOne({code})
    return stock
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