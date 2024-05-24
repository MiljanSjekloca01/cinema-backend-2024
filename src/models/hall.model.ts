import { ProjectionType } from "../entities/Hall";

export interface HallModel{
    name: string,
    capacity: number;
    projectionType: ProjectionType
}