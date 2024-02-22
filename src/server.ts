/*******************Import**********************/
import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { RhinestonesType, Rhinestone, Project } from '../types/main';
import { projects } from "../data/projects";
import { rhinestones } from "../data/rhinestones";

/*******************Main Declarations***********/
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

/***************Middleware**********************/
app.use(logRequests);


/***************Routes**************************/
app.route('/projects')
    .get((req: Request, res: Response) => {
        return res.send(projects);
    });

app.route('/rhinestones')
    .get((req: Request, res: Response)=>{
        return res.send(rhinestones)
    });

app.get('/', (req: Request, res: Response) => {
    return res.send(`The first start point for LeotardCraft projects`);
})


/***************Server Listen******************/
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});


/*************Helper functions****************/
/**
 * Function for log the request time and data
 * @param req request object
 * @param res response object
 * @param next next function
 * @returns finished logRequests middleware function
 */
function logRequests(req: Request, res: Response, next: NextFunction){
    //create instance of Data() class
    const reqTime = new Date();
    //log time when we've got the request
    console.log(`
    ----------
    ${reqTime.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`);

    return next();
}