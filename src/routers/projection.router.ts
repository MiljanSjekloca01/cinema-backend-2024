import { Router } from "express";
import asyncHandler from "express-async-handler"
import { ProjectionService } from "../services/projection.service";

export const projectionRouter = Router();


projectionRouter.get("/",asyncHandler(
    async (req,res) => { res.json(await ProjectionService.getAllProjectionsSimple()) }
))

projectionRouter.get("/onDate",asyncHandler(
    async (req,res) => { 
        const stringDate = req.query.date as string
        const date = new Date(stringDate)
        date.setHours(0,0,0,0)
        res.json(await ProjectionService.getAllProjectionsOnDate(date)) 
    }
))

projectionRouter.get("/movie/:id/dates",asyncHandler(
    async (req,res) => { res.json(await ProjectionService.getProjectionsForMovieByDates(+req.params.id)) }
))

projectionRouter.get("/movie/:id",asyncHandler(
    async (req,res) => { res.json(await ProjectionService.getProjectionsByMovieId(+req.params.id)) }
))

projectionRouter.get("/movie/:id/onDate",asyncHandler(
    async (req,res) => { 
        const stringDate = req.query.date as string
        const date = new Date(stringDate);
        date.setHours(0,0,0,0)
        res.json(await ProjectionService.getProjectionsForMovieOnDate(+req.params.id,date)) 
    }
))

projectionRouter.get("/:id",asyncHandler(
    async (req,res) => { res.json(await ProjectionService.getProjectionById(+req.params.id)) }
))


projectionRouter.post("/create",asyncHandler(
    async (req,res) => { res.json(await ProjectionService.createProjection(req.body)) }
))

projectionRouter.put("/update/:id",asyncHandler(
    async (req,res) => { res.json(await ProjectionService.updateProjectionById(+req.params.id,req.body)) }
))


projectionRouter.put("/delete/:id",asyncHandler(
    async (req,res) => { res.json(await ProjectionService.deleteProjectionById(+req.params.id)) }
))

// Dashboard Statistics 

projectionRouter.get("/today/number",asyncHandler(
    async (req,res) => { res.json(await ProjectionService.getProjectionNumberForToday()) }
))

projectionRouter.get("/this-month/number",asyncHandler(
    async (req,res) => { res.json(await ProjectionService.getProjectionNumberForThisMonth()) }
))

projectionRouter.get("/today/by-hall/number",asyncHandler(
    async (req,res) => { res.json(await ProjectionService.getProjectionsCountByHallToday()) }
))

projectionRouter.get("/month/by-hall/number",asyncHandler(
    async (req,res) => { res.json(await ProjectionService.getProjectionsCountByHallThisMonth()) }
))