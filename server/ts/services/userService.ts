import { Account } from "../models/Account"
import {CreationAttributes} from '@sequelize/core';

namespace userService{

    export const signUp = (account:CreationAttributes<Account>):Promise<any> =>{
        return Account.create(account)
    }

    export const login = (userName:string, password:string):Promise<Account|null> =>{
        return Account.findOne({where:{
            userName, password
        }})
    }

    export const getAccountInfo = (userName:string):Promise<Account|null> =>{
        return Account.findOne({where:{
            userName
        }})
    }

    export const updateAccountById = (id:number, newAttr:CreationAttributes<Account>):Promise<any> =>{
        return Account.update(newAttr, {where: {id}})
    }

    export const changePassword = (userName:string, oldPassword:string ,newPassword:string):Promise<any> =>{
        return Account.update({password:newPassword}, {where: {userName, password:oldPassword}})
    }


}



export default userService