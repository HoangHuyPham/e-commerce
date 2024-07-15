import * as dotenv from "dotenv"
import { existsSync, mkdirSync, rmSync, writeFileSync } from "fs"
dotenv.config()

namespace fileUtils {

    const savePath:string = process.env.SAVE_PATH as string

    if (!existsSync(savePath))
        mkdirSync(savePath)

    export const saveFile = (name: string, data: string|Buffer) => {
        writeFileSync(savePath+"/"+name, data)
        return savePath+"/"+name
    }

    export const removeFile = (name: string) => {
        rmSync(savePath+"/"+name, {recursive: true, force: true})
        return savePath+"/"+name
    }
}

export default fileUtils