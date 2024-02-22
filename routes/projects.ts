/*******************Import**********************/
import express, { Express, NextFunction, Request, Response, Router } from "express";
import { RhinestonesType, Rhinestone, Project } from '../types/main';
import { projects } from "../data/projects";
import { rhinestones } from "../data/rhinestones";

/*******************Main Declarations***********/
const router: Router = express.Router();

/*******************Routes without parameters***/
router.route('/')
    .get((req: Request, res: Response) => {
        return res.send(projects);
    });
/*******************Routes with parameters******/



/***********************************************/
export {router};