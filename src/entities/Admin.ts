import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("uq_admin_username", ["username"], { unique: true })
@Entity("admin", { schema: "cinema" })
export class Admin {
  @PrimaryGeneratedColumn({ type: "int", name: "admin_id", unsigned: true })
  adminId: number;

  @Column("varchar", { name: "username", unique: true, length: 255 })
  username: string;

  @Column("varchar", { name: "password", length: 255 })
  password: string;
}
