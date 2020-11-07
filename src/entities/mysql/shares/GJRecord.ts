import 'reflect-metadata'
import {Entity, Column} from "typeorm";
import { BaseEntity } from '../baseEntity'

@Entity('gj_trade')
export class GJRecord extends BaseEntity {

  @Column()
  tradeAt: number;

  @Column()
  amount: number;

  @Column()
  price: number;

  @Column()
  total: number;

  @Column()
  code: number;

  @Column()
  position: number;

  @Column()
  name: string;

  @Column()
  direction: number;

  @Column()
  remark: string

}