import { TeamRepository } from "../../domain/repositories/teamRepository";
import { DeleteTeam } from "../../domain/usecases/team/deleteTeamUseCase";
import { GetTeam } from "../../domain/usecases/team/getCoachTeamsUseCase";
import { RegisterTeam } from "../../domain/usecases/team/registerTeamUseCase";
import { DeleteTeamDTO } from "../../infrastructure/dtos/team/deleteTeamDTO";
import { GetTeamDTO } from "../../infrastructure/dtos/team/getTeamDTO";
import { RegisterTeamDTO } from "../../infrastructure/dtos/team/registerTeamDTO";


export class TeamService {
    constructor(private readonly teamRepository: TeamRepository) {}

    async register(registerTeamDTO: RegisterTeamDTO): Promise<any> {
        try {
            const registerTeam = new RegisterTeam(this.teamRepository);
            const data = await registerTeam.execute(registerTeamDTO);
            return data;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async delete(deleteTeamDTO: DeleteTeamDTO): Promise<any> {
        try {
            const registerTeam = new DeleteTeam(this.teamRepository);
            const data = await registerTeam.execute(deleteTeamDTO);
            return data;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getAll(getTeamDTO: GetTeamDTO): Promise<any> {
        try {
            const getAllTeams = new GetTeam(this.teamRepository);
            const data = await getAllTeams.execute(getTeamDTO);
            return data;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}