import { Router } from "express";
import { MovieService } from "../services/movie.service";
import asyncHandler from "express-async-handler"

export const movieRouter = Router()


movieRouter.get("/",asyncHandler(
    async (req,res) => { res.json(await MovieService.getAllMovies()) }
))

movieRouter.get("/all",asyncHandler(
    async (req,res) => { res.json(await MovieService.getAllDataFromAllMovies()) }
))

movieRouter.get("/:id",asyncHandler(
    async (req,res) => { res.json(await MovieService.getMovieById(+req.params.id)) }
))

movieRouter.post("/create",asyncHandler(
    async (req,res) => { res.json(await MovieService.createMovie(req.body)) }
))

movieRouter.put("/update/:id",asyncHandler(
    async (req,res) => { res.json(await MovieService.updateMovieById(+req.params.id,req.body)) }
))


movieRouter.put("/delete/:id",asyncHandler(
    async (req,res) => { res.json(await MovieService.deleteMovieById(+req.params.id)) }
))
