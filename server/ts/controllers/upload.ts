import { randomUUID } from "crypto"
import * as dotenv from "dotenv"
import { Request, Response } from "express"
import { ResponseStatus } from "../const/ResponseStatus"
import { ResponseData } from "../models/ResponseData"
import imageService from "../services/imageService"
import productService from "../services/productService"
import userService from "../services/userService"
dotenv.config()

export const uploadAvatar = (req: any, resp: Response): void => {
    const user = req.user
    var url: any = undefined
    var id: any = undefined

    if (!user) {
        resp.json({ status: ResponseStatus.FAILED, data: {} } as ResponseData)
    }

    if (req.file?.originalname.endsWith(".png")) {
        imageService.upload(randomUUID() + ".png", req.file?.buffer as Buffer)
            .then(e => userService.updateAccountById(user.id as number, { avatarId: e.id }))
            .then(e => resp.json({ status: ResponseStatus.SUCCESS, data: {} } as ResponseData))
            .catch(err => {
                resp.json({ status: ResponseStatus.FAILED, data: {} } as ResponseData)
            })
    } else if (req.file?.originalname.endsWith(".jpg")) {
        imageService.upload(randomUUID() + ".jpg", req.file?.buffer as Buffer)
            .then(e => {
                url = e.url
                id = e.id
                userService.updateAccountById(user.id as number, { avatarId: e.id })
            })
            .then(e => resp.json({ status: ResponseStatus.SUCCESS, data: { url, id } } as ResponseData))
            .catch(err => {
                resp.json({ status: ResponseStatus.FAILED, data: {} } as ResponseData)
            })
    }
}

export const uploadPreview = (req: any, resp: Response): void => {
    const user = req.user
    var url: any = undefined
    var id: any = undefined
    var productId: any = req.params?.id
    
    if (!user || !productId) {
        resp.json({ status: ResponseStatus.FAILED, data: {} } as ResponseData)
    }

    if (req.file?.originalname.endsWith(".png")) {
        imageService.upload(randomUUID() + ".png", req.file?.buffer as Buffer)
            .then(e => {
                url = e.url
                id = e.id
                productService.updateProductById(productId as number, { previewId: e.id })
            })
            .then(e => resp.json({ status: ResponseStatus.SUCCESS, data: { url, id } } as ResponseData))
            .catch(err => {
                resp.json({ status: ResponseStatus.FAILED, data: {} } as ResponseData)
            })
    } else if (req.file?.originalname.endsWith(".jpg")) {
        imageService.upload(randomUUID() + ".png", req.file?.buffer as Buffer)
            .then(e => {
                url = e.url
                id = e.id
                productService.updateProductById(productId as number, { previewId: e.id })
            })
            .then(e => resp.json({ status: ResponseStatus.SUCCESS, data: { url, id } } as ResponseData))
            .catch(err => {
                resp.json({ status: ResponseStatus.FAILED, data: {} } as ResponseData)
            })
    }
}