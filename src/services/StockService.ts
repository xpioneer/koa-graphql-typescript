import { Equal, Like, Between, FindManyOptions, FindConditions } from "typeorm";
import { Stock } from '../entities/mysql/shares/stock'
import { getSharesManager, getSharesRepository } from '../database/dbUtils';
import { EMarket, EBLock } from '../models/Stocks'
import StockDao from '../daos/StockDao'


class StockService {

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