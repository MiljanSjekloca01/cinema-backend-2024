import { configDotenv } from "dotenv";
import { DataSource } from "typeorm";
import { Hall } from "./entities/Hall";
import { Admin } from "./entities/Admin"
import { Movie } from "./entities/Movie";
import { Projection } from "./entities/Projection";
configDotenv()


export const AppDataSource = new DataSource({
    type:"mysql",
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [Hall,Admin,Movie,Projection],
    logging: false

})