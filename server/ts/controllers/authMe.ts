import { Request, Response } from "express"
import { ResponseStatus } from "../const/ResponseStatus"
import { ResponseData } from "../models/ResponseData"
import userService from "../services/userService"
import * as dotenv from "dotenv"
import imageService from "../services/imageService"
dotenv.config()


export const authMeGet = (req: Request, resp: Response): void => {
    let token: string = req.headers?.authorization as string
    let payload = token?.split(".")[1]
    let { userName } = JSON.parse(atob(payload))

    if (!token || !payload) {
        resp.json({ status: ResponseStatus.UNAUTHORIZED, data: {} } as ResponseData)
        return
    }

    userService.getAccountInfo(userName).then((e) => {
        return new Promise((resolve)=>{
            let info:any = e?.dataValues
            imageService.getImageById(e?.avatarId as number).then(
                e=>{
                    info.url = e?.url
                    resolve(info)
                }
            )
        })
    }).then(e=>{
        if (e) {
            resp.json({ status: ResponseStatus.SUCCESS, data: {...e,}} as ResponseData)
            return
        }
        // else {
        //     // Failed
        //     resp.json({ status: ResponseStatus.FAILED, data: {} } as ResponseData)
        //     return
        // }
    }).catch(err => {
        // Error
        console.log("authMeGet>>", err)
        resp.json({ status: ResponseStatus.UNAUTHORIZED, data: {} } as ResponseData)
    })
}


export const authMePost = (req: Request, resp: Response): void => {
    let newAttr = { ...req.body }
    let id = req.body.id

    if (!id){
        resp.json({ status: ResponseStatus.INVALID, data: newAttr } as ResponseData)
        return
    }

    userService.updateAccountById(id, newAttr).then((e) => {
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
        console.log("authMeGet>>",err)
        resp.json({ status: ResponseStatus.FAILED, data: {} } as ResponseData)
    })
}