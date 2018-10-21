import 'reflect-metadata'
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { BaseEntity } from './baseEntity'

@Entity()
export class Chat extends BaseEntity {
  @Column()
  message: string;

  @Column()
  username: string;

  @Column()
  ip: string;

}