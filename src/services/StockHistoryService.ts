import { StockHistory } from '../entities/mysql/shares/stockHistory'
import { Stock } from '../entities/mysql/shares/stock'
import StockService from './StockService'
import StockHistoryDao from '../daos/StockHistoryDao'
import { formatDate } from "../utils/tools";
import { DateFormat } from "../types/base";



class StockHistoryService {

  async getLastestTrade(stockId: number) {
    const lastestTrade = await StockHistoryDao.getLastestTrade(stockId)
    return lastestTrade
  }

  async pages(offset = 1, size = 10, stockId: number): Promise<[StockHistory[], number]> {
    if(stockId) {
      const stock = await StockService.getById(stockId)
      const [list, total] = await StockHistoryDao.pages(offset, size, stockId)
      return [
        list.map(item => {
          item.tradeAt = formatDate(+item.timestamp, DateFormat.Date)
          item.name = stock.name
          item.code = stock.code
          return item
        }),
        total
      ]
    } else {
      const [list, total] = await StockHistoryDao.pages(offset, size)
      // set code,name; format timestamp
      const ids = list.map(item => item.stockId).reduce<number[]>((pre, cur) => {
        if(!pre.includes(cur)) {
          pre.push(cur)
        }
        return pre
      }, [])
      const stocks = await StockService.getByIds(ids)
      const stockNameObj = stocks.reduce<Record<number, Stock>>((pre, cur) => {
        return {...pre, ...{[cur.id]: cur}}
      }, {})
      return [
        list.map(item => {
          item.tradeAt = formatDate(+item.timestamp, DateFormat.Date)
          const stock = stockNameObj[item.stockId]
          item.name = stock.name
          item.code = stock.code
          return item
        }),
        total
      ]
    }
  }
}

export default new StockHistoryService