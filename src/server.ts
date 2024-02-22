/*******************Import**********************/
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { RhinestonesType, Rhinestone, Project } from '../types/main';

/*******************Main Declarations***********/
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

/***************Middleware**********************/



/***************Routes**************************/
app.get('/', (req: Request,res:Response)=>{
    const pr: Project = {
        id: 1,
        title: "Test Project"
    }
res.send(`The first start point for LeotardCraft project. Project info: ${pr.id} ${pr.title}`);
})


/***************Server Listen******************/
app.listen(port,()=>{
console.log(`[server]: Server is running at http://localhost:${port}`);
});
