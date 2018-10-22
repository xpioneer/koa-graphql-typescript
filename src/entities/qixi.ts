import 'reflect-metadata'
import {Entity, Column} from "typeorm";
import { BaseEntity } from './baseEntity'

@Entity('chat')
export class Chat extends BaseEntity {
  @Column()
  message: string;

  @Column()
  username: string;

  @Column()
  ip: string;

}