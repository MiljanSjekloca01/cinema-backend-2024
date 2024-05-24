import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { Projection } from "../entities/Projection";
import { checkIfDefined, checkIfModelHasData } from "../../utils";
import { ProjectionModel } from "../models/projection.model";
import { Between } from 'typeorm';

const repo = AppDataSource.getRepository(Projection);

export class ProjectionService{


    static async getAllProjectionsSimple(){
        const data = await repo.find({
            select:{
                projectionId: true,
                projectionDate: true,
                startsAt: true,
                endsAt: true,
                hall:{ hallId: true,projectionType: true },
                movie:{ movieId: true, title: true, startsShowing: true }
            },
            where:{ movie:{ deletedAt: IsNull() }, hall: { deletedAt: IsNull() }, deletedAt: IsNull() },
            relations: { hall: true, movie: true}
        })
        return checkIfDefined(data);
    }

    static async getProjectionById(id: number): Promise<Projection>{
        const data = await repo.findOne({
            select:{
                projectionId: true,
                hallId: true,
                movieId: true,
                startsAt: true,
                endsAt: true,
                projectionDate: true,
                updatedAt: true,
                createdAt:true
            },
            where:{
                movie:{ deletedAt: IsNull() },
                hall: { deletedAt: IsNull() },
                deletedAt: IsNull(),
                projectionId: id
            },
        })
        return checkIfDefined(data);
    }


    static async getProjectionsByMovieId(movieId: number){
        const data = await repo.find({
            select:{
                projectionId: true,
                projectionDate: true,
                startsAt: true,
                endsAt: true,
                updatedAt: true,
                createdAt: true,
                movie:{ movieId: true, title: true, genre: true, releaseYear: true,description: true, image: true, mainActors: true, duration: true,startsShowing: true, },
                hall:{ name: true, capacity: true, projectionType: true, },
            },
            where:{
                movie:{ movieId: movieId, deletedAt: IsNull() },
                hall: { deletedAt: IsNull() },
                deletedAt: IsNull()
            },
            relations:{ hall: true, movie: true, }
        })
        return checkIfDefined(data);
    }

    static async getProjectionsForMovieOnDate(id: number,date: Date){
        const data = await repo.find({
            select:{
                projectionId: true,
                projectionDate: true,
                startsAt: true,
                endsAt: true,
                hall:{ name: true, projectionType: true, },
            },
            where:{
                movie:{ movieId: id, deletedAt: IsNull() },
                hall: { deletedAt: IsNull() },
                projectionDate: date,
                deletedAt: IsNull()
            },
            relations:{ hall: true}
        })
        return checkIfDefined(data);
    }

    static async createProjection(model: ProjectionModel){
        checkIfModelHasData(model,"hallId","movieId","startsAt","endsAt","projectionDate");

        const isOverlapping = await this.isOverlappingProjection(model.hallId,model.projectionDate,model.startsAt,model.endsAt)
        
        if(isOverlapping) { throw new Error("There is already a projection happening in this hall on the same date and time.") }

        const data = await repo.save({
            hallId: model.hallId,
            movieId: model.movieId,
            startsAt: model.startsAt,
            endsAt: model.endsAt,
            projectionDate: model.projectionDate,
            createdAt: new Date()
        })
        delete data.deletedAt
        return data
    }


    static async updateProjectionById(id: number,model: ProjectionModel){

        checkIfModelHasData(model,"hallId","movieId","startsAt","endsAt","projectionDate");
        const isOverlapping = await this.isOverlappingProjection(model.hallId,model.projectionDate,model.startsAt,model.endsAt)
        
        if(isOverlapping) { throw new Error("There is already a projection happening in this hall on the same date and time.") }

        const data = await this.getProjectionById(id)
        data.hallId = model.hallId,
        data.movieId = model.movieId,
        data.startsAt = model.startsAt,
        data.endsAt = model.endsAt,
        data.projectionDate = model.projectionDate
        data.updatedAt = new Date()
        
        return await repo.save(data)
    }

    static async deleteProjectionById(id: number){
        const data = await this.getProjectionById(id)
        console.log("DATA IZVUCEN IZ ID-a",data);
        data.deletedAt = new Date()
        console.log("DATA POSLE DODAVANJA DELETED AT",data);
        await repo.save(data)
        return `Projection with this id: ${data.projectionId} successfully deleted`
    }




    static async isOverlappingProjection(hallId: number, projectionDate: Date, startsAt: string, endsAt: string): Promise<boolean> {
        const overlappingProjections = await repo.find({
            // OR ili jedno ili drugo
            where: [
                { hall: { hallId: hallId }, projectionDate: projectionDate, startsAt: Between(startsAt, endsAt), deletedAt: IsNull() },
                { hall: { hallId: hallId }, projectionDate: projectionDate, endsAt: Between(startsAt, endsAt), deletedAt: IsNull() }
            ]
        });
        console.log(overlappingProjections);
        return overlappingProjections.length > 0;
    }




    static async getAllProjectionsOnDate(date: Date){
        const data = await repo.find({
            select:{
                projectionId: true,
                projectionDate: true,
                startsAt: true,
                endsAt: true,
                updatedAt: true,
                hall:{ hallId: true,projectionType: true, capacity: true, updatedAt: true },
                movie:{ movieId: true, title: true, genre: true, releaseYear: true,description: true, image: true, mainActors: true, duration: true,startsShowing: true,updatedAt: true }
            },
            where:{
                movie:{ deletedAt: IsNull() },
                hall: { deletedAt: IsNull() },
                projectionDate: date,
                deletedAt: IsNull()
            },relations: { hall: true, movie: true}
        })
        return checkIfDefined(data);
    }


    static async getProjectionsForMovieByDates(movieId: number){
        const data = await repo.find({
            select:{
                projectionId: true,
                projectionDate: true,
                startsAt: true,
                endsAt: true,
                movie:{ movieId: true, title: true, genre: true, releaseYear: true,description: true, image: true, mainActors: true, duration: true,startsShowing: true, },
                hall:{ name: true, capacity: true, projectionType: true, },
            },
            where:{
                movie:{ movieId: movieId, deletedAt: IsNull() },
                hall: { deletedAt: IsNull() },
                deletedAt: IsNull()
            },
            relations:{ hall: true, movie: true, }
        })

        const responseData = data.reduce( (acc,curr) => {
            console.log(curr)
            const date = curr.projectionDate;
            console.log(date);
            if(!acc[`${date}`]){
                acc[`${date}`] = [];
            }
            acc[`${date}`].push({
                projectionId: curr.projectionId,
                startsAt: curr.startsAt,
                endsAt: curr.endsAt,
                hall: curr.hall,
                projectionType: curr.hall.projectionType
            });
            return acc
        },{})
        return checkIfDefined(responseData);
    }

}