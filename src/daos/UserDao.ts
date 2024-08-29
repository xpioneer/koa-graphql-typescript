import {
  Equal,
  Like,
  Between,
  FindManyOptions,
  FindOptions,
  In,
} from "typeorm";
// import { Context } from 'koa'
import { Stock } from '@/entities/mysql/shares/stock'
import { EMarket, EBLock } from '@/models/Stocks'
import { useBlogRepository } from '@/database/dbUtils';



class StockDao {


  async getCode(id: number) {
    const stock = await useBlogRepository(Stock).findOne({
      where: {
        id
      }
    })
    return stock
  }

  async getById(id: number) {
    const stock = await useBlogRepository(Stock).findOne({
      where: {
        id
      },
      select: ['id', 'code', 'name']
    })
    return stock
  }

  async getByIds(ids: number[]) {
    const stocks = await useBlogRepository(Stock).find({
      where: {
        id: In(ids)
      }
    })
    // const stocks = await useBlogRepository(Stock).findByIds(ids, {
    //   select: ['id', 'code', 'name']
    // })
    return stocks
  }

  async getByCode(code: string) {
    const stock = await useBlogRepository(Stock).findOneBy({code: Equal(code)})
    return stock
  }
}

export default new StockDao