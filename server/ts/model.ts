export interface IAccount {
    username: string,
    password: string,
    firstname: string,
    lastname: string,
    balance: number,
    email?: string,
    address?: string,
    phoneNumber?: number,
    avatar?: string,
    isAdmin?: boolean
}

export interface IPicture {
    imageLink: string,
}

export interface IWatch {
    name:string,
	detail:string,	
    price:number,	
    previewLink?:string	
}

export interface AWTToken{
    code: string
}

export enum ResponseStatus{
    SUCCESSFUL = "successful",
    FAILED = "failed"
}
