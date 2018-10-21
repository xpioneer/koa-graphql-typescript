import {Entity, Column, PrimaryColumn} from "typeorm";

@Entity()
export class BaseEntity {

  @PrimaryColumn()
  id: string;

  @Column()
  created_by: string;

  @Column()
  created_at: number;

}