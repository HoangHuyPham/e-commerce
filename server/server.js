import {database as db} from "./database";

const express = require("express");
const app = express();
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

db.createAccount({
  username:"huy",
  
})


app.post("/api/v1/file/upload", (request, response) => {
  cloudinary.uploader
    .upload(
      "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
      {
        public_id: "shoes1",
        folder: "images"
      }
    )
    .then((result) => {
      response.json({
        status: "success",
        data: result,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

// Login
app.post("/api/v1/user/login", (request, response) => {});

// Regist
app.post("/api/v1/user/regist", (request, response) => {});

// Test
app.get("/", (request, response) => {
  response.json({
    status: "success",
    data: "hello",
  });
});

app.listen(APP_PORT, () => {
  console.log(`Port start at ${APP_PORT}`);
});

app.on("cl")