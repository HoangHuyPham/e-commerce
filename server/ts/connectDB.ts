import { Sequelize } from '@sequelize/core';
import { MySqlDialect } from '@sequelize/mysql';
import * as dotenv from 'dotenv';
import { Account } from './models/Account';
import { Watch } from './models/Watch';

dotenv.config()
namespace connectDB{
    const connection = new Sequelize({
        dialect: MySqlDialect,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT?Number.parseInt(process.env.DB_PORT):3306,
        models: [Account, Watch]
    })
    
    
    export const connect = async ()=>{
        try {
            await connection.authenticate()
            console.log("Connect to DB successfully.")
            await connection.sync({alter:true});
            console.log('All models were synchronized successfully.');   
        } catch (error) {
            console.log(error)
        }
    }
}

export default connectDB
