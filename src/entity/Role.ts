import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  BaseEntity
} from "typeorm";
import { Permission } from "./Permission";

@Entity()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("varchar", { length: 50, unique: true })
  name: string;

  @ManyToMany(type => Permission)
  @JoinTable()
  permissions: Permission[];
}
