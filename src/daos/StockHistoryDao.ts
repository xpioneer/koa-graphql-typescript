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
    let sqlList = `Select
      id,
      stockId,
      volume,
      open,
      high,
      low,
      close,
      chg,
      percent,
      turnoverrate,
      amount,
      pe,
      pb,
      ps,
      pcf,
      market_capital From stock_history_new sh`
    let sqlTotal = `Select count(sh.id) total From stock_history_new sh`
    
    const parameters = []

    if(stockId) {
      const whereAnd = `
        And sh.stockId = ?
      `
      sqlList += whereAnd
      sqlTotal += whereAnd
      parameters.push(stockId)
    }
    sqlList += `
      Order By sh.timestamp Desc
      Limit ?,?;`
    
    parameters.push((offset > 0 ? (offset - 1) : 0) * size, size)

    const list = await getSharesManager().query(sqlList, parameters)
    const totalRow = await getSharesManager().query(sqlTotal, parameters)
    return [list, totalRow[0].total]
  }
}

export default new StockHistoryDao