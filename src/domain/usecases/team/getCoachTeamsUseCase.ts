import { GetTeamDTO } from "../../../infrastructure/dtos/team/getTeamDTO";
import { TeamRepository } from "../../repositories/teamRepository";


interface GetTeamUseCase{ 
    execute( getTeamDTO: GetTeamDTO): Promise<any>
}

export class GetTeam implements GetTeamUseCase{

    constructor(
        private readonly teamRepository: TeamRepository,
    ){}

    async execute(getTeamDTO: GetTeamDTO): Promise<any> {

       return await this.teamRepository.getAll(getTeamDTO);
    }

}