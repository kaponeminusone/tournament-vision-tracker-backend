import { TeamEntity } from "../../domain/entities/teamEntity";
import { TeamRepository } from "../../domain/repositories/teamRepository";
import { TeamDataSource } from "../datasources/teamDataSource";
import { DeleteTeamDTO } from "../dtos/team/deleteTeamDTO";
import { GetTeamDTO } from "../dtos/team/getTeamDTO";
import { RegisterTeamDTO } from "../dtos/team/registerTeamDTO";


export class TeamRepositoryImpl implements TeamRepository {

    constructor(
        private readonly teamDataSource: TeamDataSource,
    ) { }

    async register(registerTeamDTO: RegisterTeamDTO): Promise<TeamEntity> {

        try {
            return await this.teamDataSource.register(registerTeamDTO);
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async delete(deleteTeamDTO: DeleteTeamDTO): Promise<TeamEntity> {
        try {
            return await this.teamDataSource.delete(deleteTeamDTO);
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async getAll(getTeamDTO: GetTeamDTO): Promise<any> {
        try {
            return await this.teamDataSource.getAll(getTeamDTO);
        } catch (error: any) {
            throw new Error(error);
        }
    }
}