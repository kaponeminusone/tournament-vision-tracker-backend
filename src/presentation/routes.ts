import { Router } from 'express';
import { AuthRouter } from './v1/routes/authRoutes';
import { ProofRouter } from './v1/routes/ProofRoutes';

export class AppRoutes {

    constructor(){
    }

    get routes(): Router {

        const router = Router();
        router.use('/api/v1/auth',new AuthRouter().routes);
        router.use('/api/v1/proof',new ProofRouter().routes);

        return router;
    }
    
}