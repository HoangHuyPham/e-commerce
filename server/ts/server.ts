import service from "./service";
import { ResponseStatus } from "./model";
import express, {Express, Request, Response} from "express"

const app:Express = express();
const cloudinary = require("cloudinary").v2;
const mysql = require("mysql");
const DB_PORT = 3306;

const APP_PORT = 3001;
const API_SECRET_KEY = "k_VTTcpm8FtsXEuH4H9cjO1q7DQ";
const API_KEY = "629172438352152";
const CLOUD_NAME = "dxhuah2od";
// const JWT_SECRET_KEY = "VsDBnbvZOZBnU+cizl1OpTbQJyX6EfgYie5fArQxISTYLouqZ5ZMvYbwraimAGwHysRvZpn/ciE6R+GMxWSutP+iiPUVTFSZK3w/BWMOevsfirMLyC/y5OVKPq2i7GRbZnjy0QvKhaSr3minxzPGKdOo452mPOw10253Kv0EB/BiY6RE/EKYsK43vFMyRiUmkkSGBpYLpDGrcJLVFIQFYbIuM8mAc/WHAH6t+fGElqh5m0r1DUYqvZeegw69qqsnynFcWm9pmT2DAA1P7wWj9YKLUuTMRMHXlznThyVBWE+2crB2RQgUYVb7gadqffyrG8hGMIMipUHB/fsY9fIVyg=="


// Cloudinary Configuration
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET_KEY,
});


// Express Middleware Configuration
app.use(express.json())



app.post("/api/v1/file/upload", (request, response) => {
  cloudinary.uploader
    .upload(
      "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
      {
        public_id: "shoes1",
        folder: "images"
      }
    )
    .then((result:any) => {
      response.json({
        status: "success",
        data: result,
      });
    })
    .catch((error:any) => {
      console.log(error);
    });
});

// Login
app.post("/api/v1/user/login", (request, response) => {
  console.log(`server>> ${request.body?.username}`)
  service.login(request.body?.username, request.body?.password)
  .then(e =>{
    if (e){
      //login thanh cong
      // Generate JWT Token
      let headers = {
        "alg": "HS256",
        "typ": "JWT"
      }

      let payload = {
        name: e.name,
        isAdmin: e.isAdmin
      }

      




      //
      console.log(request.headers)
      response.json({
        status: ResponseStatus.SUCCESSFUL,
        data: e
      });

    }else{
      response.json({
        status: ResponseStatus.FAILED,
        data: e
      });
    }
    
  }).catch(err=>{
    response.json({
      status: ResponseStatus.FAILED,
      data: "server error" 
    });
  })
 
  
});

// Regist
app.post("/api/v1/user/signup", (request, response) => {});

// Test
app.get("/", (request, response) => {
  response.json({
    status: ResponseStatus.SUCCESSFUL,
    data: "hello" 
  });
});

app.listen(APP_PORT, () => {
  console.log(`Port start at ${APP_PORT}`);
});

