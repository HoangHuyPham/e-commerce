import {AWTToken, IAccount} from "./model"
import db from "./database"
import { QueryResult } from "mysql2";

namespace service {
  export const signUp = (account: IAccount): Promise<boolean> => {
    return db.addAccount(account).then(e=>{
      return true
    }).catch(err=>{
      return false
    });
  };

  export const getAccountInfo = (username:string): Promise<IAccount | undefined> => {
    return db.getAccountInfo(username).then(e=>{
      let account:IAccount; 
      if (e && e[0].length > 0){
        account = {
          ...e[0][0]
        }
        return account
      }else{
        return undefined
      }
    }).catch(err=>{
      console.log(err)
      return undefined
    });
  };


  export const login = (username:string, password:string): Promise<boolean | IAccount> => {
    console.log(username, password)
    return db.getAccount(username, password).then(e=>{
      if (e && e[0].length > 0){
        console.log("ok")
        return getAccountInfo(username)
      }else{
        return false
      }
    }).catch(err=>{
      console.log(err)
      return false
    });
  };
}



export default service