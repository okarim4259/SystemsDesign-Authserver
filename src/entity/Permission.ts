import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Permission {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("varchar", { length: 50, unique: true })
  name: string;
}
