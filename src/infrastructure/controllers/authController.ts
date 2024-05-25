import { Request, Response } from 'express';


export class AuthController{

    constructor() {}

    registerUser = (req: Request, res: Response) => {

        res.send({messsage: 'RegisterUser Controller'})

    }

    loginUser = (req: Request, res: Response) => {
        
        res.send({messsage: 'loginUser Controller'})

    }

}