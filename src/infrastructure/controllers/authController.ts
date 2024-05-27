import { Request, Response } from 'express';
import { RegisterUserDTO } from '../dtos/auth/registerUserDTO';
import { LoginUserDTO } from '../dtos/auth/loginUserDTO';
import { AuthService } from '../../application/services/authService';


export class AuthController{

    constructor(
        private readonly authService: AuthService,
    ) {}

    registerUser = (req: Request, res: Response) => {

        const [ error, registerUserDTO ]= RegisterUserDTO.create(req.body);

        if( error ) return res.status(400).json({ error });
        
        this.authService.register(registerUserDTO!)
        .then( (data: any) => res.json(data))
        .catch( ( error: any ) => res.status(400).send({ message: error.message }))

    }

    loginUser = (req: Request, res: Response) => {
        
        const [ error, loginUserDTO ]= LoginUserDTO.create(req.body);

        if( error ) return res.status(400).json({ error });
        
        this.authService.login(loginUserDTO!)
        .then( (data: any) => res.json(data))
        .catch( ( error: any ) => res.status(400).send({ message: error.message }))

    }



}