import {Project} from '../types/main';

export const projects: Project[] = [
    {
        "id": 1,
        "userId": 1,
        "title": "Pink leotard",
        "rhinestones":[{"rhinestoneId": 1, "amount":155}, {"rhinestoneId":2, "amount":1000}, {"rhinestoneId":6, "amount":150}]
    },
    {
        "id": 2,
        "userId": 3,
        "title": "Butterfly",
        "rhinestones": [{ "rhinestoneId": 1, "amount": 10 }, { "rhinestoneId": 2, "amount": 2000 }, {"rhinestoneId":3, "amount":155}, {"rhinestoneId":4, "amount":1000}]
    },
    {
        "id": 3,
        "userId": 5,
        "title": "Blue leotard",
        "rhinestones": [{ "rhinestoneId": 3, "amount": 155 }, { "rhinestoneId": 4, "amount": 2000 }]
    },
]