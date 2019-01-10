// import 'reflect-metadata'
import {Entity, Column} from "typeorm";
import { BaseEntity } from './baseEntity'

@Entity('doubleColorBall')
export class Balls extends BaseEntity {

  @Column()
  issue: string;

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

  @Column()
  drawDate: number

  @Column()
  r1: number = 0
  
  @Column()
  r2: number = 0

  @Column()
  r3: number = 0
  
  @Column()
  r4: number = 0
  
  @Column()
  r5: number = 0

  @Column()
  r6: number = 0
  
  @Column()
  r7: number = 0
  
  @Column()
  r8: number = 0
  
  @Column()
  r9: number = 0
  
  @Column()
  r10: number = 0

  @Column()
  r11: number = 0
  
  @Column()
  r12: number = 0

  @Column()
  r13: number = 0
  
  @Column()
  r14: number = 0
  
  @Column()
  r15: number = 0

  @Column()
  r16: number = 0
  
  @Column()
  r17: number = 0
  
  @Column()
  r18: number = 0
  
  @Column()
  r19: number = 0
  
  @Column()
  r20: number = 0

  @Column()
  r21: number = 0
  
  @Column()
  r22: number = 0

  @Column()
  r23: number = 0
  
  @Column()
  r24: number = 0
  
  @Column()
  r25: number = 0

  @Column()
  r26: number = 0
  
  @Column()
  r27: number = 0
  
  @Column()
  r28: number = 0
  
  @Column()
  r29: number = 0
  
  @Column()
  r30: number = 0

  @Column()
  r31: number = 0
  
  @Column()
  r32: number = 0

  @Column()
  r33: number = 0
  
  @Column()
  b1: number = 0
  
  @Column()
  b2: number = 0

  @Column()
  b3: number = 0
  
  @Column()
  b4: number = 0
  
  @Column()
  b5: number = 0

  @Column()
  b6: number = 0
  
  @Column()
  b7: number = 0
  
  @Column()
  b8: number = 0
  
  @Column()
  b9: number = 0
  
  @Column()
  b10: number = 0

  @Column()
  b11: number = 0
  
  @Column()
  b12: number = 0

  @Column()
  b13: number = 0
  
  @Column()
  b14: number = 0
  
  @Column()
  b15: number = 0

  @Column()
  b16: number = 0
  
}