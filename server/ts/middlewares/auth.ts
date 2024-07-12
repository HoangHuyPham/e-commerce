import { Request, Response } from "express";
import { ResponseStatus } from "../const/ResponseStatus";
import { ResponseData } from "../models/ResponseData";
import jwt, { JwtPayload } from "jsonwebtoken"
import * as dotenv from "dotenv"
dotenv.config()

export const auth = (req:Request, resp:Response, next:any)=>{
    let token = req.headers?.authorization
    if (token){
        try {
            let payload:JwtPayload|string = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET_KEY as string)
            // Check token expire
            if (( payload as JwtPayload).iat as number <= new Date().getTime()){
                resp.json({status: ResponseStatus.EXPIRED_TOKEN, data: {}} as ResponseData)
                return
            }
        } catch (error) {
            resp.json({status: ResponseStatus.UNAUTHORIZED, data: {}} as ResponseData)
            return
        }
        next()  
    }else{
        resp.json({status: ResponseStatus.UNAUTHORIZED, data: {}} as ResponseData)
        return
    }
}