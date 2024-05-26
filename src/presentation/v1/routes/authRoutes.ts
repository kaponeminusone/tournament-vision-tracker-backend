import { Router } from 'express'
import { AuthController } from '../../../infrastructure/controllers/authController';
import { AuthRepositoryImpl } from '../../../infrastructure/persistence/authRepositoryImpl';
import { DatabaseAuthDataSource } from '../../../infrastructure/datasources/implementations/postgresql/databaseAuthDataSource';
import { AuthMiddleware } from '../../../infrastructure/middlewares/authMiddleware';
import { AuthService } from '../../../application/services/authService';

export class AuthRouter{

    get routes(): Router {
        
        const routes: Router = Router();

        // Aquí se inyectan las dependencias
        const database = new DatabaseAuthDataSource();
        const authRepository = new AuthRepositoryImpl(database);
        const authService = new AuthService(authRepository);
        const controller = new AuthController(authService);

        routes
            .get('/',[ AuthMiddleware.validateJWT ], controller.loginUser)
            .post('/login', controller.loginUser)
            .post('/register', controller.registerUser);
    
        return routes;
    }
    
}
