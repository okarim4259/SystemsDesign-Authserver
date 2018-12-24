import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { UserAccount } from "./UserAccount";

@Entity()
export class Address {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column("varchar", { length: 50 })
  addressName: string;

  @Column("varchar", { length: 255 })
  line1: string;

  @Column("varchar", { length: 255 })
  line2: string;

  @Column("varchar", { length: 50 })
  unitNumber: string;
}
