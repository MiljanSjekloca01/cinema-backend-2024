import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Hall } from "./Hall";
import { Movie } from "./Movie";

@Index("fk_projection_hall_hall_id", ["hallId"], {})
@Index("fk_projection_movie_movie_id", ["movieId"], {})
@Entity("projection", { schema: "cinema" })
export class Projection {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "projection_id",
    unsigned: true,
  })
  projectionId: number;

  @Column("int", { name: "hall_id", unsigned: true })
  hallId: number;

  @Column("int", { name: "movie_id", unsigned: true })
  movieId: number;

  @Column("datetime", { name: "starts_at" })
  startsAt: Date;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("datetime", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Hall, (hall) => hall.projections, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "hall_id", referencedColumnName: "hallId" }])
  hall: Hall;

  @ManyToOne(() => Movie, (movie) => movie.projections, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "movie_id", referencedColumnName: "movieId" }])
  movie: Movie;
}
