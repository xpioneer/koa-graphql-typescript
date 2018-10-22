import {Entity, Column, PrimaryColumn} from "typeorm";

@Entity()
export class BaseEntity {

  @PrimaryColumn()
  id: string;

  @Column()
  created_by: string;

  @Column()
  created_at: number;

  // @Column()
  // updated_by?: string;

  // @Column()
  // updated_at?: number;

  // @Column()
  // deleted_by?: string;

  // @Column()
  // deleted_at?: number;
}