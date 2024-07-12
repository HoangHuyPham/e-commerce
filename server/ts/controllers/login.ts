import { Request, Response} from "express"
import { ResponseStatus } from "../const/ResponseStatus"
import { ResponseData } from "../models/ResponseData"
import userService from "../services/userService"
import jwt from "jsonwebtoken"
import * as dotenv from "dotenv"
dotenv.config()


export const loginController = (req:Request, resp:Response):void=>{
    let userName: string = req.body?.userName
    let password: string = req.body?.password

    userService.login(userName, password).then((e) => {
        if (e){
            let expireDate = new Date(new Date().getTime() + 60000)
            // Success
            let payload = {
                userName,
                isAdmin: e.isAdmin,
                firstName: e.firstName,
                lastName: e.lastName,
                iat: expireDate.getTime()
            }

            let token = jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {algorithm:"HS256"})
            resp.json({ status: ResponseStatus.SUCCESS, data: {accessToken: token}} as ResponseData)
        }else{
            // Failed
            resp.json({ status: ResponseStatus.FAILED, data: {}} as ResponseData)
        }
        
    }).catch(err => {
        // Error
        console.log(err)
        resp.json({ status: ResponseStatus.UNAUTHORIZED, data: {}} as ResponseData)
    })
}