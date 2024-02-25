/*******************Import**********************/
import express, { Express, NextFunction, Request, Response, Router } from "express";
import { RhinestonesType, Rhinestone, Project } from '../types/main';
import { projects } from "../data/projects";
import { rhinestones } from "../data/rhinestones";
import { users } from "../data/users";
import { error } from "../src/utilities"

/*******************Main Declarations***********/
const router: Router = express.Router();

/*******************Routes without parameters***/
router.route('/')
    .get((req: Request, res: Response) => {
        return res.send({ data: projects });
    })
    .post((req: Request, res: Response, next: NextFunction) => {
        if (req.body.title && req.body.userId) {
            const project: Project = {
                "id": projects[projects.length - 1].id + 1,
                "title": req.body.title,
                "userId": req.body.userId,
            };
            projects.push(project);
            return res.send({ data: project });
        }
        else return next(error(500, "Wrong body object for POST request"));
    });

/*******************Routes with parameters******/

router.route('/:id')
    .get((req: Request, res: Response, next: NextFunction) => {

        let project: Project = projects.find(p => p.id === Number(req.params.id)) as Project;
        if (project) return res.status(200).send({ data: project })
        else return next(error(404, `Oops, something goes wrong. No projects with ID = ${req.params.id}`));
    })
    .patch((req: Request, res: Response, next: NextFunction) => {
        let project: Project = projects.find(p => p.id === Number(req.params.id)) as Project;
        //as we store objects in projects array, we have a refferance for this object
        if (project) {
            let key: keyof Project;
            //check all keys in object
            for (key in project) {
                //if we have this key in request body, chenge object. We can't change project ID and user ID!
                if (key !== "id" && key !== "userId" && (key in req.body)) {
                    project[key] = req.body[key];
                }
            }
            return res.status(200).send({ data: project })
        }
        else return next(error(404, `Oops, something goes wrong. No projects with ID = ${req.params.id}`));
    })
    .delete((req: Request, res: Response, next: NextFunction) => {
        let project: Project = projects.find((p, i) => {
            if (p.id === Number(req.params.id)) {
                projects.splice(i, 1);
                return true;
            }
        }) as Project;
        if (project) return res.status(200).send(`Project ID=${req.params.id} was deleted`)
        else return next(error(404, `Oops, something goes wrong. No projects with ID = ${req.params.id}`));
    });



/***********************************************/
export { router };