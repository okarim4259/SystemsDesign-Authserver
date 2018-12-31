import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("varchar", { length: 50, unique: true })
  name: string;
}
