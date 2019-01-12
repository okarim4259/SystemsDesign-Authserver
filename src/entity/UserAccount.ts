import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Generated,
  ManyToMany,
  JoinTable,
  BaseEntity
} from "typeorm";
import { EUserAccountType } from "../domain/helpers/EUserAccountType";
import { Role } from "./Role";

@Entity()
export class UserAccount extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  @Generated("uuid")
  userId: string;

  @Column("varchar", { length: 50, unique: true, nullable: false })
  userName: string;

  @Column("varchar", { length: 50, nullable: false })
  firstName: string;

  @Column("varchar", { length: 50 })
  lastName: string;

  @Column("varchar", { length: 50, unique: true, nullable: true })
  email: string;

  @Column("varchar", { nullable: true })
  password: string;

  @Column("varchar", { nullable: true })
  accountType: EUserAccountType;

  @Column("varchar", { nullable: true })
  externalProviderId: string;

  @Column("varchar", { nullable: true })
  phoneNumber: string;

  @ManyToMany(type => Role)
  @JoinTable()
  roles: Role[];
}
