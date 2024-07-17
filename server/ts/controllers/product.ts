import { CreationAttributes, UniqueConstraintError, UpdateValues } from "@sequelize/core"
import * as dotenv from "dotenv"
import { Request, Response } from "express"
import { ResponseStatus } from "../const/ResponseStatus"
import { ResponseData } from "../models/ResponseData"
import { Watch } from "../models/Watch"
import productService from "../services/productService"
dotenv.config()


export const productGetPagination = (req: Request, resp: Response): void => {
    let category = req.query?.category
    let keyword = req.query?.keyword

    if (category && keyword){
        productService.getPagination(keyword as string, Number(category)).then((e) => {
            if (e) {
                resp.json({ status: ResponseStatus.SUCCESS, data: e } as ResponseData)
            } else {
                // Failed
                resp.json({ status: ResponseStatus.FAILED, data: {} } as ResponseData)
            }
            return
        }).catch(err => {
            // Error
            console.log(err)
            resp.json({ status: ResponseStatus.FAILED, data: {} } as ResponseData)
        })
    }else{
        productService.getPagination().then((e) => {
            if (e) {
                resp.json({ status: ResponseStatus.SUCCESS, data: e } as ResponseData)
            } else {
                // Failed
                resp.json({ status: ResponseStatus.FAILED, data: {} } as ResponseData)
            }
            return
        }).catch(err => {
            // Error
            console.log(err)
            resp.json({ status: ResponseStatus.FAILED, data: {} } as ResponseData)
        })
    }

}

export const productGet = (req: Request, resp: Response): void => {
    const page: number = Number(req.params.page)
    const limit = 10 // return 10 product
    const offset = page * limit

    if (isNaN(page)) {
        resp.json({ status: ResponseStatus.FAILED, data: {} } as ResponseData)
        return
    }

    productService.getAllProducts(offset, limit).then((e) => {
        if (e) {
            resp.json({ status: ResponseStatus.SUCCESS, data: e } as ResponseData)
        } else {
            // Failed
            resp.json({ status: ResponseStatus.FAILED, data: {} } as ResponseData)
        }
        return
    }).catch(err => {
        // Error
        console.log(err)
        resp.json({ status: ResponseStatus.FAILED, data: {} } as ResponseData)
    })

}


export const addProductPost = (req: Request, resp: Response): void => {
    let newProduct: CreationAttributes<Watch> = req?.body
    productService.addProduct(newProduct).then(e => {
        resp.json({ status: ResponseStatus.SUCCESS, data: {} } as ResponseData)
    }).catch(err => {
        if (err instanceof UniqueConstraintError) {
            resp.json({ status: ResponseStatus.UNIQUE_KEY, data: {} } as ResponseData)
        } else {
            resp.json({ status: ResponseStatus.FAILED, data: {} } as ResponseData)
        }
    })
}

export const updateProductPost = (req: Request, resp: Response): void => {
    let newProduct: UpdateValues<Watch> = req?.body
    let id: number = newProduct?.id as number

    if (!id) {
        resp.json({ status: ResponseStatus.FAILED, data: {} } as ResponseData)
        return
    }

    productService.updateProductById(id, newProduct).then(e => {
        resp.json({ status: ResponseStatus.SUCCESS, data: {} } as ResponseData)
    }).catch(err => {


        resp.json({ status: ResponseStatus.FAILED, data: {} } as ResponseData)
    })
}

export const deleteProductPost = (req: Request, resp: Response): void => {
    let id: number = req?.body?.id as number

    if (!id) {
        resp.json({ status: ResponseStatus.FAILED, data: {} } as ResponseData)
        return
    }

    productService.deleteProductById(id).then(e => {
        resp.json({ status: ResponseStatus.SUCCESS, data: {} } as ResponseData)
    }).catch(err => {
        resp.json({ status: ResponseStatus.FAILED, data: {} } as ResponseData)
    })
}

export const productGetSearch = (req: Request, resp: Response): void => {
    let keyword = req.query?.keyword
    let category = req.query?.category


    productService.getAllProductsByOp(keyword as string, Number(category)).then(e => {
        resp.json({ status: ResponseStatus.SUCCESS, data: e } as ResponseData)
    }).catch(err => {
        console.log(err)
        resp.json({ status: ResponseStatus.FAILED, data: err } as ResponseData)
    })

}