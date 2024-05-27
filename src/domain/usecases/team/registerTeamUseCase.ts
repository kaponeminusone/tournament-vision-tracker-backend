import { RegisterTeamDTO } from "../../../infrastructure/dtos/team/registerTeamDTO";
import { TeamRepository } from "../../repositories/teamRepository";


interface RegisterTeamUseCase{ 
    execute( registerTeamDTO: RegisterTeamDTO): Promise<any>
}

export class RegisterTeam implements RegisterTeamUseCase{

    constructor(
        private readonly teamRepository: TeamRepository,
    ){}

    async execute(registerTeamDTO: RegisterTeamDTO): Promise<any> {

       return await this.teamRepository.register(registerTeamDTO);
    }

}