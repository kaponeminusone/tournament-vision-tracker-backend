import { Router } from 'express'
import { AuthController } from '../../../infrastructure/controllers/authController';
import { AuthRepositoryImpl } from '../../../infrastructure/persistence/authRepositoryImpl';
import { DatabaseAuthDataSource } from '../../../infrastructure/datasources/implementations/databaseAuthDataSource';
import { AuthMiddleware } from '../../../infrastructure/middlewares/authMiddleware';

export class AuthRouter{

    get routes(): Router {
        
        const routes: Router = Router();

        // Aquí se inyectan las dependencias
        const database = new DatabaseAuthDataSource();
        const authRepository = new AuthRepositoryImpl(database);
        const controller = new AuthController(authRepository);

        routes
        //TODO: Probando el token para acceder al login, no tiene sentido borrarlo
            .post('/login',[ AuthMiddleware.validateJWT ], controller.loginUser)
            .post('/register', controller.registerUser);

        return routes;
    }
    
}
