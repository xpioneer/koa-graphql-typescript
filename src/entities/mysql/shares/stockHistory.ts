import 'reflect-metadata'
import { Entity, Column, PrimaryColumn} from "typeorm";

export type KeyofHistory = keyof History

@Entity('stock_history_new')
export class History {
  @PrimaryColumn({ unique: true })
  id: number

  @Column()
  stockId: number

  @Column()
  timestamp: number
  
  @Column()
  volume: number
  
  @Column()
  open: number
  
  @Column()
  high: number
  
  @Column()
  low: number
  
  @Column()
  close: number
  
  @Column()
  chg: number
  
  @Column()
  percent: number
  
  @Column()
  turnoverrate: number
  
  @Column()
  amount: number
  
  @Column()
  volume_post: number
  
  @Column()
  amount_post: number
  
  @Column()
  pe: number
  
  @Column()
  pb: number
  
  @Column()
  ps: number
  
  @Column()
  pcf: number
  
  @Column()
  market_capital: number
  
  @Column()
  balance: number
  
  @Column()
  hold_volume_cn: number
  
  @Column()
  hold_ratio_cn: number
  
  @Column()
  net_volume_cn: number
  
  @Column()
  hold_volume_hk: number
  
  @Column()
  hold_ratio_hk: number
  
  @Column()
  net_volume_hk: number
}

@Entity('stock_history_5')
export class StockHistory {
  @PrimaryColumn({ unique: true })
  id: number

  @Column()
  uuid: string

  @Column()
  stockId: number

  @Column()
  open: number

  @Column()
  close: number

  @Column()
  low: number

  @Column()
  high: number

  @Column()
  rasingPrice: number

  @Column()
  rasingRatio: number

  @Column()
  total: number

  @Column()
  totalAmt: number

  @Column()
  exchangeRatio: number

  @Column()
  amplitude: number

  @Column()
  tradeAt: number

}