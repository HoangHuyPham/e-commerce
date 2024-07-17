import { Request, Response } from "express";
import { ResponseStatus } from "../const/ResponseStatus";
import { ResponseData } from "../models/ResponseData";

export const limitSize = (req:Request, resp:Response, next:any)=>{
    if (req.file){
        // Limit file size 2mb
        if (req.file.size  > (1024 * 1024 * 2)){
            resp.json({status: ResponseStatus.MAX_LIMIT, data: {}} as ResponseData)
            return
        }else{
            next()
        }
    }else{
        resp.json({status: ResponseStatus.FAILED, data: {}} as ResponseData)
    }
}