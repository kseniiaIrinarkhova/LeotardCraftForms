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
    })
    .post((req: Request, res: Response, next: NextFunction) => {
        if(req.body.title)
        {
            const project: Project = {
                "id": projects[projects.length-1].id + 1,
                "title": req.body.title
            };
            projects.push(project);
            return res.send(project);
        }
        else return res.status(500).send("Wrong body object for POST request");
    });

/*******************Routes with parameters******/



/***********************************************/
export {router};