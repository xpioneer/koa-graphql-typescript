import {Entity, Column, ObjectIdColumn, VersionColumn, CreateDateColumn, Generated} from "typeorm";
import { toDate } from 'date-fns'

@Entity()
export class BaseEntity {

  @ObjectIdColumn({ unique: true })
  id: string;

  @Column()
  createdBy?: string;

  @Column({
    default: +new Date
  })
  createdAt: string | null;

  @VersionColumn({
    default: 0
  })
  version?: number;

  @Column()
  ip: string
}