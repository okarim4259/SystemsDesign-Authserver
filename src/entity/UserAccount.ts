import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Generated,
  BaseEntity,
  ManyToMany,
  JoinTable
} from "typeorm";
import { IUserAccountType } from "../domain/IUserAccountType";
import { Role } from "./Role";

@Entity()
export class UserAccount extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  @Generated("uuid")
  userId: string;

  @Column("varchar", { length: 50, unique: true })
  userName: string;

  @Column("varchar", { length: 50 })
  firstName: string;

  @Column("varchar", { length: 50 })
  lastName: string;

  @Column("varchar", { length: 50 })
  email: string;

  @Column("varchar")
  password: string;

  @Column("varchar", { nullable: true })
  accountType: IUserAccountType;

  @Column("varchar", { nullable: true })
  googleAccountId: string;

  @ManyToMany(type => Role)
  @JoinTable()
  roles: Role[];
}
