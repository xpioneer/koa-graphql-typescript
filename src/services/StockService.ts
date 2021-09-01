import { Equal, Like, Between, FindManyOptions, FindConditions } from "typeorm";
import { Stock, StockDetail } from '../entities/mysql/shares/stock'
import { EMarket, EBLock } from '../models/Stocks'
import StockDao from '../daos/StockDao'
import StockHistoryDao from '../daos/StockHistoryDao'


class StockService {

  async getByIds(ids: number[]) {
    const stocks = await StockDao.getByIds(ids);
    return stocks
  }

  async getCode(id: number) {
    const stock = await StockDao.getCode(id);
    const lastestTrade = await StockHistoryDao.getLastestTrade(stock.id)
    const detail = new StockDetail(stock)
    console.log(detail, '---------')
    detail._lastestTradeAt = lastestTrade ? lastestTrade.timestamp : null
    return detail
  }

  async getByCode(code: string) {
    const stock = await StockDao.getByCode(code);
    return stock
  }

  async pages(offset = 1, size = 10, code?: string, name?: string, market?: EMarket, block?: EBLock) {
    const pages = await StockDao.pages(offset, size, code, name, market, block);
    return pages
  }
}

export default new StockService