import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { Hall } from "../entities/Hall";
import { checkIfDefined, checkIfModelHasData } from "../../utils";
import { HallModel } from "../models/hall.model";


const repo = AppDataSource.getRepository(Hall)
const allCinemaHallFields = { hallId: true, name: true, capacity: true, projectionType: true ,createdAt: true, updatedAt: true, projections: true}


export class HallService {

    static async getAllHalls(){
        return await repo.find({
            select: allCinemaHallFields,
            where:{
                deletedAt: IsNull()
            }
        })
    }

    static async getHallById(id:number): Promise<Hall>{
        const data = await repo.findOne({
            select: allCinemaHallFields,
            where:{
                hallId: id,
                deletedAt: IsNull()
            }
        })
        return checkIfDefined(data);
    }


    static async createHall(model: HallModel){

        checkIfModelHasData(model,"name","capacity","projectionType")

        const data = await repo.save({
            name: model.name,
            capacity: model.capacity,
            projectionType: model.projectionType,
            createdAt: new Date()
        })
        delete data.deletedAt;
        return data
    }

    static async updateHallById(id: number,model: HallModel){
        
        checkIfModelHasData(model,"name","capacity","projectionType")
        const data = await this.getHallById(id);
        data.name = model.name
        data.capacity = model.capacity
        data.projectionType = model.projectionType,
        data.updatedAt = new Date()

        return await repo.save(data);
        
    }

    static async deleteHallById(id: number){
        const data = await this.getHallById(id)
        data.deletedAt = new Date()
        await repo.save(data)
        return `Hall with this id: ${id} successfully deleted`
    }








}