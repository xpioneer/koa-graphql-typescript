import { Equal, Like, Between, FindManyOptions} from "typeorm";
import { Context } from '@core/koa'
import { History } from '../entities/mysql/shares/stockHistory'
import { Guid } from "../utils/tools";
import { getSharesManager, getSharesRepository } from '../database/dbUtils';



class StockHistoryService {

  async pages(offset = 1, size = 10, stockId: number, code?: string, name?: string) {
    const options: FindManyOptions<History> = {
      skip: (offset > 0 ? (offset - 1) : 0) * size,
      take: size,
      order: { timestamp: 'DESC' },
      where: {
        stockId: Equal(stockId)
      }
    }
    const pages = await getSharesRepository(History).findAndCount(options)
    return pages
  }
}

export default new StockHistoryService