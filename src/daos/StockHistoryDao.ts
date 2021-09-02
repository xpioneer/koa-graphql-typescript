import { Equal, Like, Between, FindManyOptions} from "typeorm";
import { StockHistory, History } from '../entities/mysql/shares/stockHistory'
import { getSharesManager, getSharesRepository } from '../database/dbUtils';



class StockHistoryDao {

  async getLastestTrade(stockId: number) {
    const lastestTrade = await getSharesRepository(History).findOne({
      select: ['timestamp'],
      where: {
        stockId: Equal(stockId)
      },
      order: {
        timestamp: 'DESC'
      }
    })
    return lastestTrade
  }

  async pages(offset = 1, size = 10, stockId?: number): Promise<[StockHistory[], number]> {
    const [list, total] = await getSharesRepository(History).findAndCount({
      select: [
        'id',
        'stockId',
        'volume',
        'open',
        'high',
        'low',
        'close',
        'chg',
        'percent',
        'turnoverrate',
        'amount',
        'pe',
        'pb',
        'ps',
        'pcf',
        'market_capital',
        'timestamp'
      ],
      where: {
        stockId: Equal(stockId)
      },
      order: {
        timestamp: 'DESC'
      },
      skip: (offset > 0 ? (offset - 1) : 0) * size,
      take: size
    })
    return [list as StockHistory[], total]
  }
}

export default new StockHistoryDao