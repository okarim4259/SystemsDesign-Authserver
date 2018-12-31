import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Generated,
  BaseEntity
} from "typeorm";

@Entity()
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  @Generated("uuid")
  addressId: string;

  @Column("varchar", { length: 50 })
  addressName: string;

  @Column("varchar", { length: 255 })
  line1: string;

  @Column("varchar", { length: 255 })
  line2: string;

  @Column("varchar", { length: 50 })
  unitNumber: string;
}
