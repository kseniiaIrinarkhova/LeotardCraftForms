# Distinctiveness and Complexity
LeotardCraft forms is a project that represents basic api for creating projects for users with rhinestones. Project created in TypeScript | Node.js | Express with Pug view engine. 
There are two main parts in project:
- UI part that shows all current users with they projects, all available rhinestones and provide opportunity to create new project for selected user with 1 rhinestone.
- API part which provides CRUD operations with users, projects, and rhinestones

# Technical documentation of the project
## Code specification
### Files structure:
- **data** - directory with data collections for each data categories
    - *project.ts* - list of Projects
    - *rhinestones.ts* - list of rhinestones
    - *users.ts* - list of users
- **dist** - directory with compiled file
    - *server.js* - compiled js file
- **public** - directory for static files
    - **css** - sub directory for css files
        - *style.css* - CSS styles
- **routes** - directory with routes
    - *project.ts* - routes for `/api/projects` route
    - *rhinestones.ts* - routes for `/api/rhinestones` route 
    - *users.ts* - routes for `/api/users` route
- **src** - directory with main code files
    - *server.ts* - main code source file for server
    - *utilities.ts* - file withhelper functions and classes that used in project
- **types** - directory with TypeScript custom types
    - *main.d.ts* - file with custom types that used in projects
- **views** - directory with views for PUG view engine
    - *index.pug* - template for main page of project
- *.env* - file with environmental variables
- *package.json* - main properties of project
### Main types
There are 3 main types that used in project:
**User** - represents user of application
**Project** - represents projects that user created
**Rhinestones** - represent rhinestones that user uses in project

## Installation

Clone repository. run `npm instull` to get all dependencies.
To run dev scripts use command `npm run dev`.

## User guide
### UI user guide
After running the server, open [main page](http://localhost:3000/).
The main aria is cards of all users with their projects.
On the right side - the list of all available rhinestones.
At the bottom of the page - form that helps to create new project. To create a new project do next steps:
1. Select user from drop-down list
2. Add title of new project
3. Select available rhinestone
4. Add amount of selected rhinestones
5. Click submit button
After submition - new project would be added to user's card.

### API user guide
There are few API routes and operations:
#### Users API
1. ##### Get All users
API end point : `/users`
API method: `GET`
return object structure: 
```
{
"data": [
{
"id": 1,
"userName": "hermioneGr",
"firstName": "Hermione",
"lastName": "Granger",
"email": "h.granger@hogwarts.com"
}
] }
```
2. ##### Create new user
API end point : `/users`
API method: `POST`
request body: 
```
{
"userName": <userName>,
"firstName": <user first name>,
"lastName": <user Leat name>,
"email": <user email>
}
```
3. ##### Get user by ID
API end point : `/users/:id`
API method: `GET`
return object structure:
```
{
"data": {
"id": <id>,
"userName": <userName>,
"firstName": <user first name>,
"lastName": <user Leat name>,
"email": <user email>
}
}
```
4. ##### Change user
API end point : `/users/:id`
API method: `PATCH`
request body: 
any of object properties:
```
{
"userName": <userName>,
"firstName": <user first name>,
"lastName": <user Leat name>,
"email": <user email>
}
```
5. ##### Delete user
API end point : `/users/:id`
API method: `DELETE`

6. ##### All user projects
API end point : `/users/:id/projects`
API method: `GET`
Additional query selectors: `rhinestoneId` - filter only projects with selected rhinestones Id

#### Projects API
1. ##### Get All projects
API end point : `/projects`
API method: `GET`
return object structure: 
```
{
    "data": [
{
"id": 1,
"userId": 1,
"title": "Pink leotard",
"rhinestones": [
{
"rhinestoneId": 1,
"amount": 155
},
{
"rhinestoneId": 2,
"amount": 1000
},
{
"rhinestoneId": 6,
"amount": 150
}
]
}]}
```
2. ##### Create new project
API end point : `/projects`
API method: `POST`
request body: 
rhinestones - optional property
```
{
"userId": <userId>,
"title": <title>,
"rhinestones": [
{
"rhinestoneId": <rhinestoneId>,
"amount": <rhinestone amount>
}
]
}
```
3. ##### Get project by ID
API end point : `/projects/:id`
API method: `GET`
return object structure:
```
{
"data": {
"id": <id>,
"userId": <userId>,
"title": <title>,
"rhinestones": [
{
"rhinestoneId": <rhinestoneId>,
"amount": <rhinestone amount>
}
]
}
}
```
4. ##### Change project
API end point : `/projects/:id`
API method: `PATCH`
request body: 
any of object properties:
```
{
"title": <title>,
"rhinestones": [
{
"rhinestoneId": <rhinestoneId>,
"amount": <rhinestone amount>
}
]
}
```
5. ##### Delete project
API end point : `/projects/:id`
API method: `DELETE`

#### Rhinestones API
1. ##### Get All rhinestones
API end point : `/rhinestones`
API method: `GET`
return object structure: 
```
{
    "data": [
{
"id": 1,
"type": "Sew-on",
"size": "15mm",
"color": "pink"
}
]}
```
2. ##### Create new rhinestone
API end point : `/rhinestones`
API method: `POST`
request body:
rhinestone type should be one of: `'Sew-on'| 'HotFix' | 'No-HotFix'` 
```
{
"type": <rhinestone type>,
"size": <size>,
"color": <color>
}
```
3. ##### Get rhinestone by ID
API end point : `/rhinestones/:id`
API method: `GET`
return object structure:
```
{
"data": {
"id": <id>,
"type": <rhinestone type>,
"size": <size>,
"color": <color>
}
}
```
4. ##### Change rhinestone
API end point : `/rhinestones/:id`
API method: `PATCH`
request body: 
any of object properties:
```
{
"type": <rhinestone type>,
"size": <size>,
"color": <color>
}
```
5. ##### Delete rhinestone
API end point : `/rhinestones/:id`
API method: `DELETE`

# Author
Project prepared as a part of education in **Software Engineering Bootcamp** at *Per Scholas* by [Kseniia Irinarkhova](https://www.linkedin.com/in/kseniia-irinarkhova/).

# Additional Resources
[How to set up TypeScript with Node.js and Express](https://blog.logrocket.com/how-to-set-up-node-typescript-express/)
[Pug view engine](https://pugjs.org/api/getting-started.html)
