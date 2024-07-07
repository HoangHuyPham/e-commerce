import config from "./config"
import { IAccount, IPicture, IWatch } from "./model"
import mysql, { QueryError, QueryResult, PoolOptions } from "mysql2"

const dbConfig:PoolOptions = loadConfig()
const connection = mysql.createPool(dbConfig).promise();


namespace db{
  export function getWatchById(id: number): Promise<?> {
    return connection.query(
            `SELECT * FROM images WHERE watch_id=?`,
            [
              id
            ]
    );
  }
  export function getWatchByName(name: string): Promise<?> {
    return connection.query(
            `SELECT * FROM images WHERE name=?`,
            [
              name
            ]
        );
  }
  
  export function addWatch(watch: IWatch): Promise<?> {
    return connection.query(
            `INSERT INTO accounts (name,	detail,	price, preview)
            VALUES (?, ?, ?, ?)`,
            [
                watch.name,
                watch.detail,
                watch.price,
                watch.previewLink
            ],
            
        );
  }
  
  
  export function removePicture(id: number): Promise<?> {
    return connection.query(
            `DELETE FROM accounts WHERE id=?`,
            [
                id
            ],
            
        );
  }
  
  export function getPicture(id: number): Promise<?> {
    return connection.query(
            `SELECT * FROM images WHERE image_id=?`,
            [
              id
            ],
            
        );
  }
  
  export function addPicture(picture: IPicture): Promise<?> {
    return connection.query(
            `INSERT INTO images (image_link) VALUES (?)`,
            [
                picture.imageLink,
            ],
            
        );
  }
  
  export function removeAccount(username: string): Promise<?> {
    return connection.query(
            `DELETE FROM accounts WHERE username=?`,
            [
                username
            ],
            
        );
  }
  
  export function getAccountInfo(username: string): Promise<?> {
    return connection.query(
            `SELECT * FROM accounts WHERE username=?`,
            [
                username
            ],
            
        );
  }

  export function getAccount(username: string, password: string): Promise<?> {
    return connection.query(
            `SELECT * FROM accounts WHERE username=? AND password=?`,
            [
                username,
                password
            ],
            
        );
  }
  
  export function addAccount(account: IAccount): Promise<?> {
    return connection.query(
            `INSERT INTO accounts (username, password, firstname, lastname, email, address, phone_number, balance, avatar, is_admin)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                account.username,
                account.password,
                account.firstname,
                account.lastname,
                account.email,
                account.address,
                account.phoneNumber,
                account.balance,
                account.avatar,
                account.isAdmin
            ],
            
        );
  }
}
function loadConfig(): object {
  return {
    host : config.db.HOST,
    user : config.db.USER,
    password : config.db.PASSWORD,
    port : config.db.PORT,
    database : config.db.DATABASE_NAME,
    connectionLimit: config.db.CONNECTIONLIMIT,
    waitForConnections: config.db.WAITFORCONNECTIONS===1?true:false
  }
}

export default db