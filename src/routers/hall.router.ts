import { Router } from "express";
import { HallService } from "../services/hall.service";
import asyncHandler from "express-async-handler"

export const hallRouter = Router()


hallRouter.get("/all",asyncHandler(
    async (req,res) => {
        res.json(await HallService.getAllHalls())
    }
))

hallRouter.get("/:id",asyncHandler(
    async (req,res) => {
        res.json(await HallService.getHallById(+req.params.id))
    }
))


hallRouter.post("/create",asyncHandler(
    async (req,res) => {
        res.json(await HallService.createHall(req.body))
    }
))

hallRouter.put("/update/:id",asyncHandler(
    async (req,res) => {
        res.json(await HallService.updateHallById(+req.params.id,req.body))
    }
))

hallRouter.put("/delete/:id",asyncHandler(
    async (req,res) => {
        res.json(await HallService.deleteHallById(+req.params.id))
    }
))