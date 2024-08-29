import {
  Equal,
  Like,
  Between,
  FindManyOptions,
  FindOptions,
  In,
} from "typeorm";
import { Context } from 'koa'
import { Stock } from '@/entities/mysql/shares/stock'
import { EMarket, EBLock } from '@/models/Stocks'
import {
  useSharesRepository,
} from '@/database/dbUtils';



class StockDao {


  async getCode(id: number) {
    const stock = await useSharesRepository(Stock).findOne({
      where: {
        id
      }
    })
    return stock
  }

  async getById(id: number) {
    const stock = await useSharesRepository(Stock).findOne({
      where: {
        id
      },
      select: ['id', 'code', 'name']
    })
    return stock
  }

  async getByIds(ids: number[]) {
    const stocks = await useSharesRepository(Stock).find({
      where: {
        id: In(ids)
      }
    })
    // const stocks = await useSharesRepository(Stock).findByIds(ids, {
    //   select: ['id', 'code', 'name']
    // })
    return stocks
  }

  async getByCode(code: string) {
    const stock = await useSharesRepository(Stock).findOneBy({code: Equal(code)})
    return stock
  }

  async getStockList(value: string, pageSize = 10) {
    const list = await useSharesRepository(Stock).find({
      where: [
        { code: Like(`%${value}%`) },
        { name: Like(`%${value}%`) }
      ],
      order: {
        code: 'DESC'
      },
      take: pageSize
    })
    return list
  }

  async pages(offset = 1, size = 10, code?: string, name?: string, market?: EMarket, block?: EBLock) {
    const where: FindManyOptions<Stock>['where'] = {}
    if(code) {
      where.code = Like(`%${code}%`)
    }
    if(name) {
      where.name = Like(`%${name}%`)
    }
    if(market) {
      where.market = Equal(market)
    }
    if(block) {
      where.block = Equal(block)
    }
    const options: FindManyOptions<Stock> = {
      skip: (offset > 0 ? (offset - 1) : 0) * size,
      take: size,
      order: { id: 'ASC'},
      where: {}
    }
    const pages = await useSharesRepository(Stock).findAndCount(options)
    return pages
  }

  async getBlocksCount(): Promise<{total: number, block: EBLock}> {
    const counts = await useSharesRepository(Stock)
      .createQueryBuilder('groupByBlocks')
      .select('count(*) as total, block')
      .groupBy('block').execute()
    // const counts = await createSharesQueryBuilder(Stock, 'groupByBlocks')
    //   .select('count(*) as total, block').groupBy('block').execute()
    return counts
  }
}

export default new StockDao