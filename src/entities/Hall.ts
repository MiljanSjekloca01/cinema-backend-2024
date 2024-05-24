import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Projection } from "./Projection";

export enum ProjectionType {
  TwoD = "2D",
  ThreeD = "3D",
}

@Entity("hall", { schema: "cinema" })
export class Hall {
  @PrimaryGeneratedColumn({ type: "int", name: "hall_id", unsigned: true })
  hallId: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("int", { name: "capacity", unsigned: true })
  capacity: number;

  @Column('enum', { name: 'projection_type', enum: ProjectionType, default: ProjectionType.TwoD })
  projectionType: ProjectionType

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("datetime", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => Projection, (projection) => projection.hall)
  projections: Projection[];
}
