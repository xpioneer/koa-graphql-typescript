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

  async pages(offset = 1, size = 10, code: string): Promise<[StockHistory[], number]> {
    // const stock = await StockService.getByCode(code)
    // if(stock) {
      const [list, total] = await StockHistoryDao.pages(offset, size)
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
    // } else {
    //   return [[], 0]
    // }
  }
}

export default new StockHistoryService