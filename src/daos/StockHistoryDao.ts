import { Equal, Like, Between, LessThanOrEqual, FindManyOptions} from "typeorm";
import { StockHistory, History } from '@/entities/mysql/shares/stockHistory'
import { useSharesRepository } from '@/database/dbUtils';

class StockHistoryDao {

  private maxCount = -1

  async getLastestTrade(stockId: number) {
    const lastestTrade = await useSharesRepository(History).findOne({
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
    const [list, total] = await useSharesRepository(History).findAndCount({
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

  private async _getTotal() {
    const start = Date.now()
    const count = await useSharesRepository(History).count().then(count => {
      console.log('get total: ', count)
      this.maxCount = count
      return this.maxCount
    })
    console.log(`time:${Date.now() - start}ms`)
    return count
  }

  async getTotal() {
    if(this.maxCount > 0) {
      return this.maxCount
    } else {
      return await this._getTotal()
    }
  }

  async getAllTrade(stockId: number, pageSize = 100) {
    const list = await useSharesRepository(History).find({
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
        timestamp: 'ASC'
      },
      take: pageSize
    })
    return list
  }
}

export default new StockHistoryDao