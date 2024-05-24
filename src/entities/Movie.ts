import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Projection } from "./Projection";

@Entity("movie", { schema: "cinema" })
export class Movie {
  @PrimaryGeneratedColumn({ type: "int", name: "movie_id", unsigned: true })
  movieId: number;

  @Column("varchar", { name: "title", length: 255 })
  title: string;

  @Column("json", { name: "genre"})
  genre: string[];

  @Column("varchar", { name: "release_year", length: 50, default: () => "''" })
  releaseYear: string;

  @Column("text", { name: "description" })
  description: string;

  @Column("varchar", { name: "image", length: 255 })
  image: string;

  @Column("json", { name: "main_actors" })
  mainActors: string[];

  @Column("int", { name: "duration" })
  duration: number;

  @Column("date", { name: "starts_showing" })
  startsShowing: Date;

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
