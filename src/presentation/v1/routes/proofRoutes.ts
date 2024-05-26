import { Router } from "express";
import { ProofController } from "../../../infrastructure/controllers/proofController";
import { AuthMiddleware } from "../../../infrastructure/middlewares/authMiddleware";


export class ProofRouter{

    get routes(): Router {
        
        const routes: Router = Router();
        
        const controller = new ProofController();

        routes
            .post('/',[AuthMiddleware.validateJWT], controller.proofPOST)
            .get('/', controller.proofGET)

            .get('/users',[AuthMiddleware.validateJWT], controller.getUsers);

        return routes;
    }
    
}