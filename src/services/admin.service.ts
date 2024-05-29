import { configDotenv } from "dotenv";
import { AppDataSource } from "../db";
import { Admin, } from "../entities/Admin";
import { LoginModel } from "../models/login.model";
import { checkIfDefined } from "../../utils";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
const repo = AppDataSource.getRepository(Admin)

configDotenv()

const accessSecret = process.env.ACCESS_TOKEN_SECRET;
const accessExpire = process.env.ACCESS_TOKEN_TTL;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
const refreshExpire = process.env.REFRESH_TOKEN_TTL;


export class AdminService{

    static async login(model: LoginModel){
        const user = await this.getUserByUsername(model.username)
        if(await bcrypt.compare(model.password,user.password)){
            return {
                username: user.username,
                accces: jwt.sign({username: user.username}, accessSecret, {expiresIn: accessExpire}),
                refresh: jwt.sign({username: user.username}, refreshSecret, {expiresIn: refreshExpire}),
            }
        }else{
            throw new Error("BAD_CREDENTIALS")
        }
    }

    public static async refreshToken(refresh: string){
        try{
            const decoded: any = jwt.verify(refresh,refreshSecret as string)
            return {
                username: decoded.username,
                access: jwt.sign({username: decoded.username},accessSecret,{expiresIn: accessExpire}),
                refresh: refresh
            }
        }catch(err){
            throw new Error("REFRESH_FAILED");
        }
    }


    static async getUserByUsername(username: string): Promise<Admin>{
        const data = await repo.findOne({
            where:{
                username: username,
            }
        })
        return checkIfDefined(data)
    }
}