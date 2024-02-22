/*******************Import**********************/
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { RhinestonesType, Rhinestone, Project } from '../types/main';
import { projects } from "../data/projects";
import { rhinestones } from "../data/rhinestones";

/*******************Main Declarations***********/
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

/***************Middleware**********************/



/***************Routes**************************/
app.route('/projects')
    .get((req: Request, res: Response) => {
        console.log("Get all projects");
        return res.send(projects);
    });

app.route('/rhinestones')
    .get((req: Request, res: Response)=>{
        console.log("Get all rhinestones");
        return res.send(rhinestones)
    });

app.get('/', (req: Request, res: Response) => {
    // res.json({projects, rhinestones})
    return res.send(`The first start point for LeotardCraft projects`);
})


/***************Server Listen******************/
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
