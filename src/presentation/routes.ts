import { Router } from 'express';
import { AuthRouter } from './v1/routes/authRoutes';
import { JwtUtil } from '../utils/jwt';
import { ProofRouter } from './v1/routes/proofRoutes';
import { CoachMiddleware } from '../infrastructure/middlewares/coachMiddleware';
import { TeamRouter } from './v1/routes/teamRoutes';
import { AuthMiddleware } from '../infrastructure/middlewares/authMiddleware';

export class AppRoutes {

    constructor(){
    }

    get routes(): Router {

        const router = Router();
        router.use('/api/v1/auth',new AuthRouter().routes);
        router.use('/api/v1/proof',new ProofRouter().routes);
        router.use('/api/v1/teams',[AuthMiddleware.validateJWT, CoachMiddleware.isCoach],new TeamRouter().routes);

        return router;
    }
    
}