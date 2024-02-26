/*******************Import**********************/
import express, { Express, NextFunction, Request, Response, Router } from "express";
import { RhinestonesType, Rhinestone, Project } from '../types/main';
import { projects } from "../data/projects";
import { rhinestones } from "../data/rhinestones";
import { users } from "../data/users";
import { error, addRhinestones } from "../src/utilities"

/*******************Main Declarations***********/
const router: Router = express.Router();

/*******************Routes without parameters***/
router.route('/')
//get all projects
    .get((req: Request, res: Response) => {
        const links = [
            {
                href: "/api/projects/:id",
                rel: ":id",
                type: "GET",
            }
        ];
        return res.send({ data: projects, links: links });
    })
    //create a new project
    .post((req: Request, res: Response, next: NextFunction) => {
        //need title and userId
        if (req.body.title && req.body.userId) {
            let project: Project = {
                "id": projects[projects.length - 1].id + 1,
                "title": req.body.title,
                "userId": req.body.userId,
            };
            //add list of rhinestones
            if("rhinestones" in req.body){
                project.rhinestones = [];
                project = addRhinestones(project, req.body.rhinestones);
            }
            projects.push(project);
            //return created data
            return res.send({ data: project });
        }
        //return error
        else return next(error(500, "Wrong body object for POST request"));
    });

/*******************Routes with parameters******/

router.route('/:id')
//get specific project by ID
    .get((req: Request, res: Response, next: NextFunction) => {
//try to find project by Id
        let project: Project = projects.find(p => p.id === Number(req.params.id)) as Project;
        //if found return data
        if (project){
            const links = [
                {
                    href: `/api/projects/${req.params.id}`,
                    rel: "",
                    type: "PATCH",
                },
                {
                    href: `/api/projects/${req.params.id}`,
                    rel: "",
                    type: "DELETE",
                }
            ];
            return res.status(200).send({ data: project, links: links });
        } 
        //else return error
        else return next(error(404, `Oops, something goes wrong. No projects with ID = ${req.params.id}`));
    })
    //change project by Id
    .patch((req: Request, res: Response, next: NextFunction) => {
        //try  to find project by id
        let project: Project = projects.find(p => p.id === Number(req.params.id)) as Project;
        //as we store objects in projects array, we have a refferance for this object
        if (project) {
            //changed rhinestones
            if ("rhinestones" in req.body)
            {
                project.rhinestones =[];
            }
            let key: keyof Project;
            //check all keys in object
            for (key in project) {
                //if we have this key in request body, chenge object. We can't change project ID and user ID!
                if (key !== "id" && key !== "userId" && (key in req.body)) {
                    //if we get array of rhinestones
                    if(key == "rhinestones"){
                        project = addRhinestones(project, req.body.rhinestones);
                    }
                    else project[key] = req.body[key];
                }
            }
            //return data
            return res.status(200).send({ data: project })
        }
        //return error
        else return next(error(404, `Oops, something goes wrong. No projects with ID = ${req.params.id}`));
    })
    //delete project by Id
    .delete((req: Request, res: Response, next: NextFunction) => {
        //try to find project by Id
        let project: Project = projects.find((p, i) => {
            if (p.id === Number(req.params.id)) {
                //if found delete project from collection
                projects.splice(i, 1);
                return true;
            }
        }) as Project;
        //if found and dekleted object return confirmation
        if (project) return res.status(200).send({ message: `Project ID=${req.params.id} was deleted` })
        //return error
        else return next(error(404, `Oops, something goes wrong. No projects with ID = ${req.params.id}`));
    });


    
/***********************************************/
export { router };