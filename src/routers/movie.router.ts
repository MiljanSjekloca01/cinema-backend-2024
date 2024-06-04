import { Router } from "express";
import { MovieService } from "../services/movie.service";
import asyncHandler from "express-async-handler"

export const movieRouter = Router()


movieRouter.get("/currently-showing",asyncHandler(
    async (req,res) => { res.json(await MovieService.getCurrentlyShowingMovies()) }
))

movieRouter.get("/coming-soon",asyncHandler(
    async (req,res) => { res.json(await MovieService.getAllComingUpMovies()) }
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

movieRouter.get("/currently-showing/number",asyncHandler(
    async (req,res) => { res.json(await MovieService.getCurrentlyShowingMoviesNumber()) }
))


movieRouter.get("/coming-soon/number",asyncHandler(
    async (req,res) => { res.json(await MovieService.getComingSoonMoviesNumber()) }
))


