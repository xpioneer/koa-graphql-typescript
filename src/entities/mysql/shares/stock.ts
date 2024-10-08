import 'reflect-metadata'
import {Entity, Column, PrimaryColumn} from "typeorm";

@Entity('stocks')
export class Stock {
  @PrimaryColumn({ unique: true })
  id: number

  @Column()
  uuid: string

  @Column()
  name: string

  @Column()
  code: string

  @Column()
  market: number

  @Column()
  block: number

  @Column()
  amount: number // 单手成交数量

}


export class StockDetail extends Stock {
  constructor(arg: Stock) {
    super()
    this.id = arg.id
    this.name = arg.name
    this.code = arg.code
    this.market = arg.market
    this.block = arg.block
    this.amount = arg.amount
    // this.lastestTradeAt = 0
  }

  lastestTradeAt = 0

  // private _lastestTradeAt = 0

  // get lastestTradeAt() {
  //   return this._lastestTradeAt
  // }
  // set lastestTradeAt(val) {
  //   this._lastestTradeAt = +val
  // }
}