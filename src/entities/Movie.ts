import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Projection } from "./Projection";

@Entity("movie", { schema: "cinema" })
export class Movie {
  @PrimaryGeneratedColumn({ type: "int", name: "movie_id", unsigned: true })
  movieId: number;

  @Column("varchar", { name: "title", length: 255 })
  title: string;

  @Column("varchar", { name: "genre", length: 50 })
  genre: string;

  @Column("varchar", { name: "release_year", length: 50, default: () => "''" })
  releaseYear: string;

  @Column("text", { name: "description" })
  description: string;

  @Column("varchar", { name: "image_url", length: 255 })
  imageUrl: string;

  @Column("varchar", { name: "main_actors", length: 255 })
  mainActors: string;

  @Column("int", { name: "duration" })
  duration: number;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("datetime", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => Projection, (projection) => projection.movie)
  projections: Projection[];
}
