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
}



export default userService