import { Request, Response } from 'express';
import { DatabaseProof } from '../datasources/implementations/postgresql/databaseProof';
import { DatabaseAuthDataSource } from '../datasources/implementations/postgresql/databaseAuthDataSource';

export class ProofController{

    constructor() {}

    proofPOST = async (req: Request, res: Response) => {

       
    }

    proofGET = (req: Request, res: Response) => {
        
    }

    getUsers = async (req: Request, res: Response) => {
        
        //TODO: Por mientras
        try {
            await new DatabaseProof().getUsers()
            .then(users => res.send(
                {users: users, message:'loginUser Controller', payload: req.body.payload}
            ))
        } catch (error: any) {
            res.status(400).send({message: error.message})
        }
       
    }

    createTeam = async (req: Request, res: Response) => {

        try {
            const { name, playerIds } = req.body;
            const coachId = req.body.payload.dni; // Asumiendo que el ID del usuario autenticado está en req.user


            // TODO: se llama caso de uso, el servicio, y al servicio se le pone el repositorio, el repositorio la base de datos.
            const team = await new DatabaseProof().createTeam({ name, coachId, playerIds });

            res.send(team);

        } catch (error: any) {
            console.log("Se jodio");
            res.status(400).send({message: error.message})
        }
       
    }


    

}