// import 'reflect-metadata'
import {Entity, Column} from "typeorm";
import { BaseEntity } from './baseEntity'

@Entity('balls')
export class Balls extends BaseEntity {

  @Column()
  orderId: string;

  @Column()
  red1: number;

  @Column()
  red2: number;

  @Column()
  red3: number;

  @Column()
  red4: number;

  @Column()
  red5: number;

  @Column()
  red6: number;

  @Column()
  blue: number;

  @Column()
  happySun: string;

  @Column()
  pool: number;

  @Column()
  prizeOne: number;

  @Column()
  prizeOneNum: number;

  @Column()
  prizeTwo: number;

  @Column()
  prizeTwoNum: number;

  @Column()
  bettingNum: number;
}