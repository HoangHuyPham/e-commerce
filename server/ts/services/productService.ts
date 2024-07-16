import { CreationAttributes, UpdateValues } from "@sequelize/core"
import * as dotenv from "dotenv"
import { Image } from "../models/Image"
import { Watch } from "../models/Watch"
dotenv.config()

namespace productService {
    const LIMIT:number = 10

    export const getPagination = async () => {
        let min = -1
        let max = -1
        await Watch.findAll().then(e=>{
            min = 0
            max = Math.ceil(e.length / LIMIT) - 1
        })
        return new Promise(resolve => resolve({min, max, size:LIMIT}))
    }

    export const getAllProducts = (offset: number = 0, limit:number = LIMIT) => {
        return Watch.findAll({
            include: [
                {
                    model: Image,
                    as: 'preview',
                    attributes: ['url'],
                },
            ],

            offset,
            limit

        })
    }

    export const getProductById = (id: number) => {
        return Watch.findOne({
            where: { id }
        })
    }

    export const updateProductById = (id: number, newAttr: UpdateValues<Watch>): Promise<any> => {
        return Watch.update(newAttr, { where: { id } })
    }

    export const addProduct = (watch: CreationAttributes<Watch>): Promise<any> => {
        return Watch.create(watch)
    }

}



export default productService