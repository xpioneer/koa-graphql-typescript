import 'reflect-metadata'
import {Entity, Column} from "typeorm";
import { BaseEntity } from './baseEntity'

@Entity('article')
export class Article extends BaseEntity {

  @Column()
  title: string;

  @Column({
    type: 'text'
  })
  description: string;

  @Column()
  abstract: string;

  @Column({length: 32})
  type_id: string

  @Column()
  remark: string

}