import express from "express";
import dotenv from "dotenv"
import authRouter from "./routes/apiRouter"
import connectDB from "./connectDB";
dotenv.config()

connectDB.connect()
const app = express()
const cors = require("cors")
const PORT = process.env.APP_PORT || 3000


app.use([express.json(), cors({origin: "http://localhost:3000", credentials: true}), express.urlencoded({extended: true})])

app.use("/api/v1", authRouter)


app.listen(PORT, ()=>{
    console.log(`Port start at ${PORT}`);
})