import {Entity, Column, ObjectIdColumn, VersionColumn, CreateDateColumn, Generated} from "typeorm";
import * as Moment from 'moment'

@Entity()
export class BaseEntity {

  @ObjectIdColumn({ unique: true })
  id: string;

  @Column()
  created_by?: string;

  @Column({
    default: Moment().format('YYYY/MM/DD hh:mm:ss.SSS')
  })
  created_at: string | null;

  @VersionColumn({
    default: 0
  })
  version?: number;

  @Column()
  ip: string
}