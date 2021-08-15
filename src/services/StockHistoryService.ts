import { StockHistory } from '../entities/mysql/shares/stockHistory'
import StockService from './StockService'
import StockHistoryDao from '../daos/StockHistoryDao'
import { formatDate } from "../utils/tools";
import { DateFormat } from "../types/base";



class StockHistoryService {

  async pages(offset = 1, size = 10, code: string): Promise<[StockHistory[], number]> {
    const stock = await StockService.getByCode(code)
    if(stock) {
      const [list, total] = await StockHistoryDao.pages(offset, size, stock.id)
      return [
        list.map(item => {
          item.tradeAt = formatDate(+item.timestamp, DateFormat.Date)
          return item
        }),
        total
      ]
    } else {
      return [[], 0]
    }
  }
}

export default new StockHistoryService