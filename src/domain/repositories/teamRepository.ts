import { DeleteTeamDTO } from "../../infrastructure/dtos/team/deleteTeamDTO";
import { GetTeamDTO } from "../../infrastructure/dtos/team/getTeamDTO";
import { RegisterTeamDTO } from "../../infrastructure/dtos/team/registerTeamDTO";
import { TeamEntity } from "../entities/teamEntity";

export interface TeamRepository{
    register( registerTeamDTO: RegisterTeamDTO): Promise<TeamEntity>;
    delete( deleteTeamDTO: DeleteTeamDTO): Promise<TeamEntity>;
    getAll( getTeamDTO: GetTeamDTO): Promise<any>;
}