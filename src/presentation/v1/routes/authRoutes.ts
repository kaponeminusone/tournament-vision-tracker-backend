import { Router } from 'express'
import { AuthController } from '../../../infrastructure/controllers/authController';

export class AuthRouter{

    
    get routes(): Router {
        
        const routes: Router = Router();
        const controller = new AuthController();

        routes
            .post('/login', controller.loginUser)
            .post('/register', controller.registerUser);

        return routes;
    }
    
}
