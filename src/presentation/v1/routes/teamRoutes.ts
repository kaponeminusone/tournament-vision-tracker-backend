import { Router } from "express";
import { DatabaseTeamDataSource } from "../../../infrastructure/datasources/implementations/postgresql/databaseTeamDataSource";
import { TeamRepositoryImpl } from "../../../infrastructure/persistence/teamRepositoryImpl";
import { TeamService } from "../../../application/services/teamService";
import { TeamController } from "../../../infrastructure/controllers/teamController";

export class TeamRouter{

    get routes(): Router {
        
        const routes: Router = Router();

        // Aquí se inyectan las dependencias
        const database = new DatabaseTeamDataSource();
        const authRepository = new TeamRepositoryImpl(database);
        const authService = new TeamService(authRepository);
        const controller = new TeamController(authService);

        routes
            .post('/register', controller.registerTeam)
            .post('/delete', controller.deleteTeam)
            .post('/', controller.getAllTeams);
    
        return routes;
    }
    
}
