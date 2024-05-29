import { Request } from "express";

export interface RequestModel extends Request {
    username: string
}