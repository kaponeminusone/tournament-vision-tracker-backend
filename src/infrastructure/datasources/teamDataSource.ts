import { TeamEntity } from "../../domain/entities/teamEntity";
import { DeleteTeamDTO } from "../dtos/team/deleteTeamDTO";
import { GetTeamDTO } from "../dtos/team/getTeamDTO";
import { RegisterTeamDTO } from "../dtos/team/registerTeamDTO";

export abstract class TeamDataSource{

    abstract register( registerTeamDTO: RegisterTeamDTO): Promise<TeamEntity>;
    abstract delete( deleteTeamDTO: DeleteTeamDTO): Promise<TeamEntity>;
    abstract getAll( getTeamDTO: GetTeamDTO): Promise<any>; //TODO: Adaptar al array con todos los datos

}
