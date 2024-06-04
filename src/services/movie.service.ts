import { IsNull, LessThanOrEqual, MoreThan, MoreThanOrEqual } from "typeorm";
import { AppDataSource } from "../db";
import { Movie } from "../entities/Movie";
import { MovieModel } from "../models/movie.model";
import { checkIfDefined, checkIfModelHasData } from "../../utils";


const repo = AppDataSource.getRepository(Movie)
const allMovieFields = { 
    movieId: true, 
    title: true, 
    genre: true, 
    releaseYear: true,
    description: true,
    image: true,
    createdAt: true, 
    mainActors: true,
    duration: true,
    startsShowing: true,
    updatedAt: true, 
}

export class MovieService{


    static async getCurrentlyShowingMovies(){
        return await repo.find({
            select:{ movieId: true, title: true, image: true,startsShowing: true },
            where: { 
                startsShowing: LessThanOrEqual(new Date()),
                deletedAt: IsNull() 
            }
        })
    }

    static async getAllComingUpMovies(){
        return await repo.find({
            select:{ movieId: true, title: true, image: true,startsShowing: true },
            where: { 
                startsShowing: MoreThan(new Date()),
                deletedAt: IsNull() 
            }
        })
    }

    static async getAllDataFromAllMovies(){
        return await repo.find({
            select: allMovieFields,
            where: {deletedAt: IsNull()}
        })
    }

    static async getMovieById(id: number): Promise<Movie>{
        const data =  await repo.findOne({
            select: allMovieFields,
            where: { movieId: id, deletedAt: IsNull() }
        })

        return checkIfDefined(data)
    }


    static async createMovie(model: MovieModel){

        checkIfModelHasData(model,"title","genre","releaseYear","description","image","mainActors","duration","startsShowing")
        
        const data = await repo.save({
            title: model.title,
            genre: model.genre,
            releaseYear: model.releaseYear,
            description: model.description,
            image: model.image,
            mainActors: model.mainActors,
            duration: model.duration,
            startsShowing: model.startsShowing,
            createdAt: new Date()
        })
        delete data.deletedAt
        return data;
    }


    static async updateMovieById(id: number,model: MovieModel){

        checkIfModelHasData(model,"title","genre","releaseYear","description","image","mainActors","duration","startsShowing")
        const data = await this.getMovieById(id)
        data.title = model.title,
        data.genre = model.genre,
        data.releaseYear = model.releaseYear,
        data.description = model.description,
        data.image = model.image,
        data.mainActors = model.mainActors,
        data.duration = model.duration,
        data.startsShowing = model.startsShowing
        data.updatedAt = new Date()

        return await repo.save(data)
    }

    static async deleteMovieById(id: number){
        const data = await this.getMovieById(id)
        data.deletedAt = new Date()
        await repo.save(data);
        return `Movie with this name: ${data.title} ,\n started showing date :${data.startsShowing} successfully deleted`
    }


    // For Statistics Dashboard
    static async getCurrentlyShowingMoviesNumber(){
        const data = await repo.find({
            select: {movieId: true},
            where: { 
                startsShowing: LessThanOrEqual(new Date()),
                deletedAt: IsNull() 
            }
        })
        return data.length
    }

    static async getComingSoonMoviesNumber(){
        const data = await repo.find({
            select:{ movieId: true},
            where: { 
                startsShowing: MoreThan(new Date()),
                deletedAt: IsNull() 
            }
        })
        return data.length
    }


 






}   