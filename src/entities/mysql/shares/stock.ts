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