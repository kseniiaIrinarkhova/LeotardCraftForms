/*******************Import**********************/
import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
// import { RhinestonesType, Rhinestone, Project, ResError } from '../types/main';
import { projects } from "../data/projects";
import { rhinestones } from "../data/rhinestones";
import { users } from "../data/users";
import { router as projectRouter } from '../routes/projects';
import { router as rhinestoneRouter } from '../routes/rhinestones';
import { router as usersRouter } from "../routes/users";
import { ResError } from './utilities';
import path from 'path';

/*******************Main Declarations***********/
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const viewsPath: string = path.join(__dirname, '../views')


app.set('view engine', 'pug');
app.set('views', viewsPath);
/***************Middleware**********************/
app.use(logRequests);
app.use(express.json());


/***************Routes**************************/
app.get('/', (req: Request, res: Response) => {

    return res.render('index', {users: users, projects: projects, rhinestones: rhinestones})
})

//use  specific routes
app.use('/api/projects', projectRouter);
app.use('/api/rhinestones', rhinestoneRouter);
app.use('/api/users', usersRouter);


//Not found middleware
app.use((req: Request, res: Response) => {
    res.status(404).json({ errors: [{ message: "Resource Not Found" }] });
});

//error handling middleware
app.use((err: ResError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({ errors: [{ message: err.message }] });
});

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
function logRequests(req: Request, res: Response, next: NextFunction) {
    //create instance of Data() class
    const reqTime = new Date();
    //log time when we've got the request
    console.log(`
    ----------
    ${reqTime.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`);

    return next();
}