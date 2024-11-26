import express from "express";

import userrouter from "./routes/user.js";
import taskrouter from "./routes/user.js";

import {config} from "dotenv";
import cookieParser from "cookie-parser"
import { errorMiddleware } from "./middlewares/err.js";
import cors from "cors"



export const app=express(); 
config({
    path:"./data/config.env",
})

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}))




app.use("/api/v1/users",userrouter);
app.use("/api/v1/tasks",taskrouter);



app.get("/",(req,res)=>{
    res.send("Nice working");
})


app.use(errorMiddleware);





