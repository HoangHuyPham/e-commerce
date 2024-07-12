import { ResponseStatus } from "../const/ResponseStatus";

export interface ResponseData{
    status:ResponseStatus,
    data?:any
}