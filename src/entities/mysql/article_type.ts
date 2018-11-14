import 'reflect-metadata'
import {Entity, Column} from "typeorm";
import { BaseEntity } from './baseEntity'

@Entity('article_type')
export class ArticleType extends BaseEntity {

  @Column()
  name: string;

  @Column()
  remark: string

}