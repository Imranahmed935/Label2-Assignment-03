import express, { Application, Request, Response } from "express";
export const app:Application = express();



app.get('/', (req:Request, res:Response)=>{
    res.send("Library Management App server is Ready!")
})

