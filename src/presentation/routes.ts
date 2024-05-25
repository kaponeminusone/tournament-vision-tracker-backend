import { Router } from 'express';
import { AuthRouter } from './v1/routes/authRoutes';

export class AppRoutes {

    constructor(){
    }

    get routes(): Router {

        const router = Router();
        router.use('/api/v1/auth',new AuthRouter().routes);

        return router;
    }
    
}