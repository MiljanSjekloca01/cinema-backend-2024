import cors from "cors";
import { configDotenv } from "dotenv";
import express = require("express");
import morgan from "morgan";
import { AppDataSource } from "./db";
import { hallRouter } from "./routers/hall.router";
import { movieRouter } from "./routers/movie.router";
import { projectionRouter } from "./routers/projection.router";
import { adminRouter } from "./routers/admin.router";
import { authenticateToken } from "../utils";


const app = express();
app.use(express.json())
app.use(cors())
app.use(morgan("tiny"))
configDotenv()


const port = process.env.SERVER_PORT || 4000;
AppDataSource.initialize().then(() => {
    console.log("Connected to database");
    app.listen(port, () => {
        console.log("App started and listening on port " + port)
    })
}).catch((e) => { console.log(e); })



app.use(authenticateToken)
app.use("/api/hall",hallRouter);
app.use("/api/movie",movieRouter);
app.use("/api/projection",projectionRouter)
app.use("/api/admin",adminRouter)
app.use("/favicon.ico", async (req,res) => { res.json("No icon") })

app.get("/",async (req,res) => {
    res.json("Backend running");
})

const handleNotFound = (req,res) => {
    res.status(501).json({ message: "NOT_IMPLEMENTED", timestamp: new Date() })
}

app.get("*", handleNotFound);
app.post("*", handleNotFound);
app.put("*", handleNotFound);
app.delete("*", handleNotFound);

