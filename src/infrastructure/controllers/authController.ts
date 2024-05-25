import { Request, Response } from 'express';
import { RegisterUserDTO } from '../dtos/registerUserDTO';
import { AuthRepository } from '../../domain/repositories/authRepository';


export class AuthController{

    constructor(
        //TODO: Cambiar AuthRepository por el serivce
        private readonly authService: AuthRepository,
    ) {}

    registerUser = (req: Request, res: Response) => {

        const [ error, registerUserDTO ]= RegisterUserDTO.create(req.body);

        if( error ) return res.status(400).json({error});
       
        this.authService.register(registerUserDTO!)
        .then( user => res.json(user))
        .catch( error => res.send(error)) //TODO manejar el error de mejor manera

    }

    loginUser = (req: Request, res: Response) => {
        
        res.send({messsage: 'loginUser Controller'})

    }

}