/*******************Import**********************/
import express, { NextFunction, Request, Response, Router } from "express";
import { Project, User } from '../types/main';
import { users } from "../data/users";
import { projects } from "../data/projects";
import { error } from "../src/utilities";



/*******************Main Declarations***********/
const router: Router = express.Router();

/*******************Routes without parameters***/
router.route('/')
    //get all users
    .get((req: Request, res: Response) => {
        const links = [
            {
                href: "users/:id",
                rel: ":id",
                type: "GET",
            },
            {
                href: "users/:id/projects",
                rel: ":id",
                type: "GET", 
            }
        ];
        return res.send({ data: users, links: links });
    })
    // post new user
    .post((req: Request, res: Response, next: NextFunction) => {
        //check that all required fields exist in body
        if (req.body.userName && req.body.firstName && req.body.lastName && req.body.email) {
            //create user
            const user: User = {
                "id": users[users.length - 1].id + 1,
                "userName": req.body.userName,
                "firstName": req.body.firstName,
                "lastName": req.body.lastName,
                "email": req.body.email
            };
            //add user to our collection
            users.push(user);
            //send response
            return res.send({ data: user });
        }
        //send error response
        else return next(error(500, "Wrong body object for POST request"));
    });

/*******************Routes with parameters******/

router.route('/:id')
    //get user by id
    .get((req: Request, res: Response, next: NextFunction) => {

        //try to find user with provided in route id
        let user: User = users.find(p => p.id === Number(req.params.id)) as User;
        //if found - return this user
        if (user) {
            const links = [
                {
                    href: `users/${req.params.id}`,
                    rel: "",
                    type: "PATCH",
                },
                {
                    href: `users/${req.params.id}`,
                    rel: "",
                    type: "DELETE",
                }
            ];
            return res.status(200).send({ data: user, links: links });
        }
        //else return error
        else return next(error(404, `Oops, something goes wrong. No users with ID = ${req.params.id}`));
    })
    //change user data 
    .patch((req: Request, res: Response, next: NextFunction) => {
        //try to find user with provided in route id
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
            //return changed user
            return res.status(200).send({ data: user })
        }
        //return error
        else return next(error(404, `Oops, something goes wrong. No users with ID = ${req.params.id}`));
    })
    //delete user by id
    .delete((req: Request, res: Response, next: NextFunction) => {
        //try to find user by id
        let user: User = users.find((p, i) => {
            if (p.id === Number(req.params.id)) {
                //if found - cut this object from collection
                users.splice(i, 1);
                return true;
            }
        }) as User;
        //if user was in collection return that it was deleted
        if (user) return res.status(200).send({ message: `User ID=${req.params.id} was deleted` })
        //return error
        else return next(error(404, `Oops, something goes wrong. No users with ID = ${req.params.id}`));
    });

//find user projects
router.route('/:id/projects')
    //get user projects
    .get((req: Request, res: Response, next: NextFunction) => {
        //try to find user by provided id
        let user: User = users.find(p => p.id === Number(req.params.id)) as User;
        //check if we have query variable
        let rhinestoneId = Number(req.query["rhinestoneId"]);
        //if found user
        if (user) {
            let userProjects: Project[];
            //find all projects with userid
            userProjects = projects.filter((p) => p.userId === Number(req.params.id));
            //if found projects
            if (userProjects.length > 0) {
                //check if we have query parameters - rhinestoneID
                if (rhinestoneId) {
                    //filter user projects by rhinestone ID
                    userProjects = userProjects.filter((p) => {
                        //check if project has rhinestones
                        if (p.rhinestones !== undefined) {
                            for (const r of p.rhinestones) {
                                //check that we search for this rhinestoneID
                                if (r.rhinestoneId === rhinestoneId) return true;
                            }
                        }
                    })
                    //return the error that we don't have project with specific rhinestone id
                    if (userProjects.length == 0) return next(error(404, `User with ID = ${req.params.id} doesn't have projects with rhinestone ID = ${rhinestoneId}.`));
                }
                //return projects
                return res.status(200).send({ data: userProjects });
            }
            //return error
            else return next(error(404, `User with ID = ${req.params.id} doesn't have projects.`));
        };
    })



/***********************************************/
export { router };