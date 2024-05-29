import { Router } from "express";
import asyncHandler from "express-async-handler";
import { AdminService } from "../services/admin.service";

export const adminRouter = Router()

adminRouter.post("/login",asyncHandler(
    async (req,res) => {
        res.json(await AdminService.login(req.body))
    }
))


adminRouter.post("/refresh",asyncHandler(
    async (req,res) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        res.json(await AdminService.refreshToken(token))
    }
))