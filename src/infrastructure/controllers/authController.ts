import { Request, Response } from 'express';
import { RegisterUserDTO } from '../dtos/registerUserDTO';
import { AuthRepository } from '../../domain/repositories/authRepository';
import { JwtUtil } from '../../utils/jwt';
import { DatabaseAuthDataSource } from '../datasources/implementations/databaseAuthDataSource';


export class AuthController{

    constructor(
        //TODO: Cambiar AuthRepository por el serivce
        private readonly authService: AuthRepository,
    ) {}

    registerUser = (req: Request, res: Response) => {

        const [ error, registerUserDTO ]= RegisterUserDTO.create(req.body);

        if( error ) return res.status(400).json({ error });
       
        this.authService.register(registerUserDTO!)
        //TODO: cambiar por el caso de uso (TEMPORAL HAY QUE LLAMAR AL CASO DE USO)
        .then( async user => {

            res.json({
                token: await JwtUtil.generateToken({role: user.role, id: user.id}), 
                user
            })
            
        })
        .catch( ( error: any ) => res.status(400).send({ message: error.message }));
        //TODO manejar el error de mejor manera
    }

    loginUser = (req: Request, res: Response) => {
        
        let data = {message: 'loginUser Controller'}

        //TODO por mientras luego eliminar
        new DatabaseAuthDataSource().getUsers()
        .then(users => res.send({users: users, message:'loginUser Controller', payload: req.body.payload}))
        .catch(err => res.send({messsage: 'loginUser Controller'}))
    }

}