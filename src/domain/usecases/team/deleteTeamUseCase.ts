import { DeleteTeamDTO } from "../../../infrastructure/dtos/team/deleteTeamDTO";
import { RegisterTeamDTO } from "../../../infrastructure/dtos/team/registerTeamDTO";
import { TeamRepository } from "../../repositories/teamRepository";


interface DeleteTeamUseCase{ 
    execute( deleteTeamDTO: DeleteTeamDTO): Promise<any>
}

export class DeleteTeam implements DeleteTeamUseCase{

    constructor(
        private readonly teamRepository: TeamRepository,
    ){}

    async execute(deleteTeamDTO: DeleteTeamDTO): Promise<any> {
        
       return await this.teamRepository.delete(deleteTeamDTO);
    }

}
