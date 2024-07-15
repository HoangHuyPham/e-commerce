import { Request, Response } from "express-serve-static-core"
import { ResponseStatus } from "../const/ResponseStatus"
import { ResponseData } from "../models/ResponseData"
import userService from "../services/userService"

export const signUpController = (req: Request, resp: Response): void => {
    let userName: string = req.body?.userName
    let password: string = req.body?.password
    let firstName: string = req.body?.firstName
    let lastName: string = req.body?.lastName
    let email: string = req.body?.email
    let address: string  = req.body?.address
    let phoneNumber: number = req.body?.phoneNumber
    let avatarId: number = req.body?.avatarId
    let isAdmin: boolean = req.body?.isAdmin

    userService.signUp({ userName, password, firstName, lastName, email, address, phoneNumber, avatarId, isAdmin}).then(() => {
        resp.json({ status: ResponseStatus.SUCCESS, data: "Created" } as ResponseData)
    }).catch(err => {
        resp.json({ status: ResponseStatus.FAILED, data: "Account may be exist" } as ResponseData)
    })

}