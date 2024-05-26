import { Router } from 'express'
import { AuthController } from '../../../infrastructure/controllers/authController';
import { AuthRepositoryImpl } from '../../../infrastructure/persistence/authRepositoryImpl';
import { DatabaseAuthDataSource } from '../../../infrastructure/datasources/implementations/databaseAuthDataSource';

export class AuthRouter{

    
    get routes(): Router {
        
        const routes: Router = Router();

        // Aquí se inyectan las dependencias
        const database = new DatabaseAuthDataSource();
        const authRepository = new AuthRepositoryImpl(database);
        const controller = new AuthController(authRepository);

        routes
            .post('/login', controller.loginUser)
            .post('/register', controller.registerUser);

        return routes;
    }
    
}
