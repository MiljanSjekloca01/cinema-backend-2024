import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { Hall } from "../entities/Hall";
import { checkIfDefined, checkIfModelHasData } from "../../utils";
import { HallModel } from "../models/hall.model";


const repo = AppDataSource.getRepository(Hall)
const allCinemaHallField = { hallId: true, name: true, capacity: true, createdAt: true, updatedAt: true, }


export class HallService {

    static async getAllHalls(){
        return await repo.find({
            select: allCinemaHallField,
            where:{
                deletedAt: IsNull()
            }
        })
    }

    static async getHallById(id:number): Promise<Hall>{
        const data = await repo.findOne({
            select:{ hallId: true, name: true, capacity: true, createdAt: true, updatedAt: true, },
            where:{
                hallId: id,
                deletedAt: IsNull()
            }
        })
        return checkIfDefined(data);
    }


    static async createHall(model: HallModel){

        checkIfModelHasData(model,"name","capacity")

        const data = await repo.save({
            name: model.name,
            capacity: model.capacity,
            createdAt: new Date()
        })
        delete data.deletedAt;
        return data
    }

    static async updateHallById(id: number,model: HallModel){
        
        checkIfModelHasData(model,"name","capacity")
        const data = await this.getHallById(id);
        data.name = model.name
        data.capacity = model.capacity
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