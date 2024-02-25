/*******************Import**********************/
import express, { Express, NextFunction, Request, Response, Router } from "express";
import { RhinestonesType, Rhinestone, Project , User} from '../types/main';
import { users } from "../data/users";


/*******************Main Declarations***********/
const router: Router = express.Router();

/*******************Routes without parameters***/
router.route('/')
    .get((req: Request, res: Response) => {
        return res.send(users);
    })
    .post((req: Request, res: Response, next: NextFunction) => {
        if (req.body.userName && req.body.firstName && req.body.lastName && req.body.email) {
            const user: User = {
                "id": users[users.length - 1].id + 1,
                "userName": req.body.userName,
                "firstName": req.body.firstName,
                "lastName": req.body.lastName,
                "email": req.body.email
            };
            users.push(user);
            return res.send(user);
        }
        else return res.status(500).send("Wrong body object for POST request");
    });

/*******************Routes with parameters******/

router.route('/:id')
    .get((req: Request, res: Response) => {
        let user: User = users.find(p => p.id === Number(req.params.id)) as User;
        if (user) return res.status(200).send(user)
        else return res.status(404).send("Ups, something goes wrong")
    })
    .patch((req: Request, res: Response) => {
        let user: User = users.find(p => p.id === Number(req.params.id)) as User;
        //as we store objects in users array, we have a refferance for this object
        if (user) {
            let key: keyof User;
            //check all keys in object
            for (key in user) {
                //if we have this key in request body, chenge object
                if (key !== "id" && (key in req.body)) {
                    user[key] = req.body[key];
                }
            }
            return res.status(200).send(user)
        }
        else return res.status(404).send("Ups, something goes wrong")
    })
    .delete((req: Request, res: Response) => {
        let user: User = users.find((p, i) => {
            if (p.id === Number(req.params.id)) {
                users.splice(i, 1);
                return true;
            }
        }) as User;
        if (user) return res.status(200).send(`User ID=${req.params.id} was deleted`)
        else return res.status(404).send("Ups, something goes wrong")
    });



/***********************************************/
export { router };