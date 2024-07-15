import * as dotenv from "dotenv";
import { Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ResponseStatus } from "../const/ResponseStatus";
import { ResponseData } from "../models/ResponseData";
import userService from "../services/userService";
dotenv.config()

export const auth = (req:any, resp:Response, next:any):void=>{
    let token = req.headers?.authorization
    if (token){
        try {
            // Verify token
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

   
        let u = JSON.parse(atob(token.split(".")[1])) 
        userService.getAccountInfo(u.userName).then(e=>{
            req.user = e
            next()  
        })
        
    }else{
        resp.json({status: ResponseStatus.UNAUTHORIZED, data: {}} as ResponseData)
        return
    }
}