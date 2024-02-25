/*******************Import**********************/
import express, { NextFunction, Request, Response, Router } from "express";
import {  Rhinestone} from '../types/main';
import { rhinestones } from "../data/rhinestones";
import { isRhinostoneType } from "../src/utilities";
import { error } from "../src/utilities";

/*******************Main Declarations***********/
const router: Router = express.Router();

/*******************Routes without parameters***/
router.route('/')
//get all rhinestones
    .get((req: Request, res: Response) => {
        const links = [
            {
                href: "/api/rhinestones/:id",
                rel: ":id",
                type: "GET",
            }
        ];
        return res.send({ data: rhinestones, links: links });
    })
    //create rhinestone
    .post((req: Request, res: Response, next:NextFunction) => {
//check that all required fields are in body
        if (req.body.type && req.body.size && req.body.color) {
//check the type of rhinestones
            if (!isRhinostoneType(req.body.type)) return next(error(500, "Rhinestone types should be 'Sew-on', 'HotFix' or 'No-HotFix'"));
            //create Rhinestone object
            const rhinestone: Rhinestone = {
                "id": rhinestones[rhinestones.length - 1].id + 1,
                "type": req.body.type,
                "size": req.body.size,
                "color": req.body.color
            }
            //add rhinestone to collections
            rhinestones.push(rhinestone);
            //send result
            return res.status(201).send({ data: rhinestone });
        }
        //send error
        else return next(error(500, "Wrong body object for POST request"));
    });


/*******************Routes with parameters******/
router.route('/:id')
//get rhinestone by Id
    .get((req: Request, res: Response, next: NextFunction) => {
        //try to find rhinestone by Id
        let stone: Rhinestone = rhinestones.find(s => s.id === Number(req.params.id)) as Rhinestone;
        //return object if found
        if (stone){
            const links = [
                {
                    href: `/api/rhinestones/${req.params.id}`,
                    rel: "",
                    type: "PATCH",
                },
                {
                    href: `/api/rhinestones/${req.params.id}`,
                    rel: "",
                    type: "DELETE",
                }
            ];
            return res.status(200).send({ data: stone, links: links });
        } 
        //return error
        else return next(error(404, `Oops, something goes wrong. No rhinestoness with ID = ${req.params.id}`));
    })
    //change rhinestone by Id
    .patch((req: Request, res: Response, next: NextFunction) => {
        //try to find rhinestone by Id
        let stone: Rhinestone = rhinestones.find(s => s.id === Number(req.params.id)) as Rhinestone;
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
            //return changed object
            return res.status(200).send({data: stone})
        }
        //return error
        else return next(error(404, `Oops, something goes wrong. No rhinestoness with ID = ${req.params.id}`));
    })
    //delete rhinestone by Id
    .delete((req: Request, res: Response, next: NextFunction) => {
        //try to find rhinestone by Id
        let stone: Rhinestone = rhinestones.find((s, i) => {
            if (s.id === Number(req.params.id)) {
                //if found - delete rhinestone from collection
                rhinestones.splice(i, 1);
                return true;
            }
        }) as Rhinestone;
        //return confirmation
        if (stone) return res.status(200).send({ message: `Rhinestone ID=${req.params.id} was deleted` })
        //return error
        else return next(error(404, `Oops, something goes wrong. No rhinestoness with ID = ${req.params.id}`));
    });


/***********************************************/
export { router };