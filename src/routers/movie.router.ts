import { Router } from "express";
import { MovieService } from "../services/movie.service";
import asyncHandler from "express-async-handler"
import multer from 'multer';
import { MovieModel } from "../models/movie.model";
import path from "path";
import fs from "fs"

export const movieRouter = Router()
const upload = multer({ dest: 'src/images/' })

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

movieRouter.get("/:id/image", asyncHandler(async (req, res) => {

    const movie = await MovieService.getMovieById(+req.params.id);
    if(movie && movie.image) {
        const imagePath = path.join(__dirname,'..','images',movie.image);
        if(fs.existsSync(imagePath)) {
            const image = fs.readFileSync(imagePath);
            res.set('Content-Type', 'image/jpeg')
            res.send(image);
        }else {
            res.status(404).send('IMAGE_NOT_FOUND');
        }
    }else {
        res.status(404).send('NO_SUCH_MOVIE');
    }
}));

// Mozda izmjenjati u future
movieRouter.delete("/:id/image", asyncHandler(async (req, res) => {
    const movie = await MovieService.getMovieById(+req.params.id);
    if (movie) {
        if (movie.image) {
            const imagePath = path.join(__dirname, '..', 'images', movie.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
                res.status(200).send('IMAGE_DELETED');
            } else {
                res.status(200).send('IMAGE_NOT_FOUND');
            }
        } else {
            res.status(200).send('NO_IMAGE_FOR_MOVIE');
        }
    } else {
        res.status(404).send('NO_SUCH_MOVIE');
    }
}));


movieRouter.post("/create", upload.single('image'), asyncHandler(
    async (req, res) => {
        const { title, genre, releaseYear, description, mainActors, duration, startsShowing } = req.body;
        const image = req.file?.filename;
   
        const genreArray = genre.split(",");
        const mainActorsArray = mainActors.split(",");
        const newMovie: MovieModel = {
            title,
            genre: genreArray,
            releaseYear,
            description,
            image,
            mainActors: mainActorsArray,
            duration,
            startsShowing
        };

        res.json(await MovieService.createMovie(newMovie));
    }
));

movieRouter.put("/update/:id",asyncHandler(
    async (req,res) => { 
        res.json(await MovieService.updateMovieById(+req.params.id,req.body))
    }
))

// same as regular update just does upload of image 
movieRouter.put("/update/:id/newImage",upload.single('image'),asyncHandler(
    async (req,res) => { 
        const { title, genre, releaseYear, description, mainActors, duration, startsShowing } = req.body;
        const image = req.file?.filename;
        const genreArray = genre.split(",");
        const mainActorsArray = mainActors.split(",");
        const updatedMovie: MovieModel = { title, genre: genreArray, releaseYear, description, image, mainActors: mainActorsArray, duration, startsShowing };
        res.json(await MovieService.updateMovieById(+req.params.id,updatedMovie)) }
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


