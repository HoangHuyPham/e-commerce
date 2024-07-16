import * as dotenv from "dotenv";
import { Response } from "express";
import { ResponseStatus } from "../const/ResponseStatus";
import { ResponseData } from "../models/ResponseData";
dotenv.config()

export const isAdmin = (req:any, resp:Response, next:any):void=>{
    let token = req.headers?.authorization
    if (token){
        let u = JSON.parse(atob(token.split(".")[1])) 
        if (u.isAdmin){
            next()
        }else{
            resp.json({status: ResponseStatus.UNAUTHENTICATE, data: {}} as ResponseData)
        }
        return
    }else{
        resp.json({status: ResponseStatus.UNAUTHORIZED, data: {}} as ResponseData)
        return
    }
}