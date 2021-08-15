import { Context } from '@core/koa'
import { StockHistory, History, KeyofHistory } from '../entities/mysql/shares/stockHistory'
import { Guid } from "../utils/tools";
import { getSharesManager, getSharesRepository } from '../database/dbUtils';
import $http from '../utils/http'
import StockCtrl from './StockController'
import StockService  from '../services/StockService'
import StockHistoryService from "../services/StockHistoryService";
import { Stock_His_API_Origin, Stock_His_API_Host, Stock_His_API_Url, Stock_His_API_Cookie, UA } from '../../conf/api.conf'

interface IStockKLineResponse {
  code: string
  name: string
  klines: string[]
}

const cols = ["timestamp","volume","open","high","low","close","chg","percent","turnoverrate","amount","volume_post","amount_post","pe","pb","ps","pcf","market_capital","balance","hold_volume_cn","hold_ratio_cn","net_volume_cn","hold_volume_hk","hold_ratio_hk","net_volume_hk"]

const requestXueqiu = async (code: string) => {
  const params = {
    symbol: code,
    begin: 1628567129263,
    period: 'day',
    type: 'before',
    count: -10000,
    indicator: 'kline,pe,pb,ps,pcf,market_capital,agt,ggt,balance',
  }
  const url = `https://${Stock_His_API_Host}${Stock_His_API_Url}`

  return await $http.get(url, {
    params,
    headers: {
      'Cookie': Stock_His_API_Cookie,
      'Origin': `https://${Stock_His_API_Origin}`,
      'Referer': `https://${Stock_His_API_Origin}`,
      'User-Agent': UA
    }
  })
}


class SharesController {

  async batchInsert(ctx: Context) {
    const { page = 0 } = ctx.query
    try {
      // 数据库查数据
      console.time('a')
      const _stocks = await StockCtrl.getList(page, 10)
      const stocks = _stocks.map(s => {
        delete s.uuid
        s.code = `${s.market === 1 ? 'SH' : 'SZ'}${s.code}`
        return s
      });
      console.log('stock------', stocks)
      console.timeEnd('a')
      
      // 拉雪球的数据，并且写入库
      const proList = stocks.map(async stock => {
        const res1 = await requestXueqiu(stock.code) // {data: {item: [1,2,3,4]}}
        const list1: number[][] = (res1.data.item || [])
        console.log('list1------', stock.name, stock.code, list1.length)
        const res2 = await SharesController.addListArr(list1, stock.id)
        return res2
      })
      console.log('入库..., ', page)
      const res = await Promise.all(proList)

      // const single = stocks[0]
      // console.time('b')
      // const result = await requestXueqiu(single.code) // {data: {item: [1,2,3,4]}}
      // const dayLines: number[][] = (result.data.item || [])
      // console.log(dayLines.length, 'length.....', single)
      // console.timeEnd('b')
      // console.time('c')
      // const res = await SharesController.addListArr(dayLines, single.id)
      // console.timeEnd('c')
      
      ctx.Json({
        msg: 'success',
        data: res
      })
      
      // ctx.Json({
      //   msg: 'success',
      //   data: dayLines.length
      // })

    } catch(e) {
      throw e
    }
  }

  static async add(data: History) {
    let model = new History()
    model.stockId = data.stockId
    model.timestamp = data.timestamp
    model.volume = data.volume
    model.open = data.open
    model.high = data.high
    model.low = data.low
    model.close = data.close
    model.chg = data.chg
    model.percent = data.percent
    model.turnoverrate = data.turnoverrate
    model.amount = data.amount
    model.volume_post = data.volume_post
    model.amount_post = data.amount_post
    model.pe = data.pe
    model.pb = data.pb
    model.ps = data.ps
    model.pcf = data.pcf
    model.market_capital = data.market_capital
    model.balance = data.balance
    model.hold_volume_cn = data.hold_volume_cn
    model.hold_ratio_cn = data.hold_ratio_cn
    model.net_volume_cn = data.net_volume_cn
    model.hold_volume_hk = data.hold_volume_hk
    model.hold_ratio_hk = data.hold_ratio_hk
    model.net_volume_hk = data.net_volume_hk
    const result = await getSharesManager().save(model)
    return result.id
  }

  static async addList(list: number[], stockId: number) {
    let model = new History()
    model.stockId = stockId
    cols.forEach((c: KeyofHistory, i) => {
      return model[c] = list[i]
    })
    const result = await getSharesManager().save(model)
    return result.id
  }

  static async addListArr(list: number[][], stockId: number) {
    const _list: History[] = []
    list.forEach(kline => {
      let model = new History()
      model.stockId = stockId
      cols.forEach((c: KeyofHistory, i) => {
        return model[c] = kline[i]
      })
      _list.push(model)
    })
    const result = await getSharesManager().save(_list)
    return result.map(r => r.id)
  }

  async pages(ctx: Context) {
    const { code, page = 1, pageSize = 10 } = ctx.query
    if(!code) {
      throw new Error('code参数缺失')
    }
    const [list, total] = await StockHistoryService.pages(Number(page), Number(pageSize), code)
    ctx.Pages({list, total})
  }

  async updateHistory(ctx: Context) {
    const { code } = ctx.fields
    const stock = await StockService.getByCode(code)
    // const [list, total] = await StockHistoryService.pages(1, 10, stock.id)
    // let lastestDate = 0
    // if(total > 0) {
    //   lastestDate = list[total - 1].timestamp
    //   const today = new Date
    //   // const 
    // } else {
    //   // 
    // }
    return stock
  }
}

export default new SharesController
