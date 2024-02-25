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

router.route('/:id')
    .get((req: Request, res: Response) => {
        let project: Project = projects.find(p => p.id === Number(req.params.id)) as Project;
        if (project) return res.status(200).send(project)
        else return res.status(404).send("Ups, something goes wrong")
    })
    .patch((req: Request, res: Response)=>{
        let project: Project = projects.find(p => p.id === Number(req.params.id)) as Project;
        //as we store objects in projects array, we have a refferance for this object
        if (project){
            let key: keyof Project;
            //check all keys in object
            for(key in project)
            {
                //if we have this key in request body, chenge object
                if( key !== "id" && (key in req.body))
                {
                    project[key] = req.body[key]; 
                }
            }
            return res.status(200).send(project)
        } 
        else return res.status(404).send("Ups, something goes wrong")
    })
    .delete((req: Request, res: Response) => {
        let project: Project = projects.find((p,i) => {
            if(p.id === Number(req.params.id)){
                projects.splice(i,1);
                return true;
            }}) as Project;
        if (project) return res.status(200).send(`Project ID=${req.params.id} was deleted`)
        else return res.status(404).send("Ups, something goes wrong")
    });



/***********************************************/
export {router};