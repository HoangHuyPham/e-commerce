import { AccordionButton } from "react-bootstrap";
import service from "./service"
const mysql = require("mysql")
const DB_PORT = 3306;


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: DB_PORT,
  password: '',
  database: 'ecommerce'
});

service.Account()

const executeQuery = (query)=>{
  let res = false;
  let handleQuery = () =>{
    connection.query()
  }

  connection.connect((err) => {
    if (err) {
      console.log(`Can't connect to db, error code: ${err.code}`);
    } else {
      handleQuery();
    }
  });
  return res;
}

export const database = {
  
};
