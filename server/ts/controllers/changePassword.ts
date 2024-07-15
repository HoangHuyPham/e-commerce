import { Request, Response } from "express"
import { ResponseStatus } from "../const/ResponseStatus"
import { ResponseData } from "../models/ResponseData"
import userService from "../services/userService"
import * as dotenv from "dotenv"
dotenv.config()

export const changePassword = (req: Request, resp: Response): void => {
    let {userName, oldPassword, newPassword} = req.body

    if (!userName){
        resp.json({ status: ResponseStatus.INVALID, data: {} } as ResponseData)
        return
    }

    userService.changePassword(userName, oldPassword, newPassword).then((e) => {
        if (e) {
            resp.json({ status: ResponseStatus.SUCCESS, data: e } as ResponseData)
            return
        } else {
            // Failed
            resp.json({ status: ResponseStatus.FAILED, data: {} } as ResponseData)
            return
        }

    }).catch(err => {
        // Error
        console.log("changePass>>",err)
        resp.json({ status: ResponseStatus.FAILED, data: {} } as ResponseData)
    })
}
