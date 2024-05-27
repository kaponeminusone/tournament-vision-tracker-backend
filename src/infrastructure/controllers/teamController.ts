import { Request, Response } from 'express';
import { RegisterTeamDTO } from '../dtos/team/registerTeamDTO';
import { GetTeamDTO } from '../dtos/team/getTeamDTO';
import { DeleteTeamDTO } from '../dtos/team/deleteTeamDTO';
import { TeamService } from '../../application/services/teamService';


export class TeamController{

    constructor(
        private readonly teamService: TeamService,
    ) {}

    registerTeam = (req: Request, res: Response) => {

        const [ error, registerTeamDTO ]= RegisterTeamDTO.create(req.body);
        if( error ) return res.status(400).json({ error });
        
        this.teamService.register(registerTeamDTO!)
        .then( (data: any) => res.json(data))
        .catch( ( error: any ) => res.status(400).send({ message: error.message }))
    }

    getAllTeams = (req: Request, res: Response) => {
        
        const [ error, getTeamDTO ]= GetTeamDTO.create(req.body);

        if( error ) return res.status(400).json({ error });
        
        this.teamService.getAll(getTeamDTO!)
        .then( (data: any) => res.json(data))
        .catch( ( error: any ) => res.status(400).send({ message: error.message }))

    }

    deleteTeam = (req: Request, res: Response) => {
        
        const [ error, deleteTeamDTO ]= DeleteTeamDTO.create(req.body);

        if( error ) return res.status(400).json({ error });
        
        this.teamService.delete(deleteTeamDTO!)
        .then( (data: any) => res.json(data))
        .catch( ( error: any ) => res.status(400).send({ message: error.message }))
    }



}