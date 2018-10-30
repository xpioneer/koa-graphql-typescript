import {Entity, Column, PrimaryColumn} from "typeorm";

@Entity()
export class BaseEntity {

  @PrimaryColumn({ unique: true })
  id?: string;

  @Column()
  created_by?: string;

  @Column()
  created_at: number;

  @Column({select: false})
  updated_by?: string;

  @Column({select: false})
  updated_at?: number;

  @Column({select: false})
  deleted_by?: string;

  @Column({select: false})
  deleted_at?: number;

  @Column({
    select: false,
    default: 0,
    onUpdate: '111'
  })
  version?: number;
}