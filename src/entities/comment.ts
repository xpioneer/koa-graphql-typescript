import 'reflect-metadata'
import {Entity, Column} from "typeorm";
import { BaseEntity } from './baseEntity'

@Entity('comment')
export class Comment extends BaseEntity {

  @Column()
  description: string;

  @Column()
  article_id: string;

  @Column()
  remark: string

}