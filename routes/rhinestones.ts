/*******************Import**********************/
import express, { Express, NextFunction, Request, Response, Router } from "express";
import { RhinestonesType, Rhinestone, Project } from '../types/main';
import { projects } from "../data/projects";
import { rhinestones } from "../data/rhinestones";
import { isRhinostoneType } from "../src/utilities";

/*******************Main Declarations***********/
const router: Router = express.Router();

/*******************Routes without parameters***/
router.route('/')
    .get((req: Request, res: Response) => {
        return res.send(rhinestones);
    })
    .post((req: Request, res: Response) => {

        if (req.body.type && req.body.size && req.body.color) {

            if (!isRhinostoneType(req.body.type)) res.status(500).send("Rhinestone types should be 'Sew-on', 'HotFix' or 'No-HotFix'");
            const rhinestone: Rhinestone = {
                "id": rhinestones[rhinestones.length - 1].id + 1,
                "type": req.body.type,
                "size": req.body.size,
                "color": req.body.color
            }
            rhinestones.push(rhinestone);
            return res.status(201).send(rhinestone);
        }
        else return res.status(500).send("Wrong body object for POST request");
    });


/*******************Routes with parameters******/



/***********************************************/
export { router };