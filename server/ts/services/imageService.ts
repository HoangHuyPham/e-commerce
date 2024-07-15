import * as dotenv from "dotenv"
import { v2 as cloudinary } from "cloudinary"
import fileUtils from "../helper/fileUtils"
import { Image } from "../models/Image"
dotenv.config()

namespace imageService {

    cloudinary.config({
        api_key: process.env.API_KEY,
        cloud_name: process.env.CLOUD_NAME,
        api_secret: process.env.API_SECRET_KEY,
    })


    export type ImageResponse = { id?: number, publicId?: number , url?:string}

    export const getImageById = async (id: number): Promise<Image | null> => {
        return Image.findOne({where: {id}})
    }

    export const upload = async (name: string, data: Buffer | string): Promise<ImageResponse> => {
        const file = fileUtils.saveFile(name, data)
        var res:any = {id: undefined, publicId:undefined, url:undefined}
        if (!!file) {
            await cloudinary.uploader.upload(file, {
                folder: "images"
            })
                .then(e => Image.create({ publicId: e.public_id, url: e.url }))
                .then(e => {
                    res = {...e.dataValues}
                    console.log(`${__filename} >> database save`)
                })
                .catch(err => {
                    console.log(err)
                    return new Promise(() => { return {} as ImageResponse })
                }).finally(() => {
                    console.log(`delete >> ${fileUtils.removeFile(name)}`)
                })

            return new Promise((resolve:any, reject:any) => {
                if (!res.id){
                    reject(undefined)
                }
                resolve(res as ImageResponse)
            } )
        } else {
            return new Promise(() => undefined)
        }
    }


}



export default imageService