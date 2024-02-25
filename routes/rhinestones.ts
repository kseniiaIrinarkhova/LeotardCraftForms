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
router.route('/:id')
    .get((req: Request, res: Response) => {
        let stone: Rhinestone = rhinestones.find(s => s.id === Number(req.params.id)) as Rhinestone;
        if (stone) return res.status(200).send(stone)
        else return res.status(404).send("Ups, something goes wrong")
    })
    .patch((req: Request, res: Response) => {
        let stone: Rhinestone = rhinestones.find(s => s.id === Number(req.params.id)) as Rhinestone;
        console.log(stone)
        //as we store objects in projects array, we have a refferance for this object
        if (stone) {
            let key: keyof Rhinestone;
            //check all keys in object
            for (key in stone) {
                //if we have this key in request body, chenge object
                if (key !== "id" && (key in req.body)) {
                    stone[key] = req.body[key];
                }
            }
            return res.status(200).send(stone)
        }
        else return res.status(404).send("Ups, something goes wrong")
    })
    .delete((req: Request, res: Response) => {
        let stone: Rhinestone = rhinestones.find((s, i) => {
            if (s.id === Number(req.params.id)) {
                rhinestones.splice(i, 1);
                return true;
            }
        }) as Rhinestone;
        if (stone) return res.status(200).send(`Rhinestone ID=${req.params.id} was deleted`)
        else return res.status(404).send("Ups, something goes wrong")
    });


/***********************************************/
export { router };