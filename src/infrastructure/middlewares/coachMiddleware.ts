import { NextFunction, Request, Response } from "express";

export class CoachMiddleware{
    
    static isCoach(req: Request, res: Response, next: NextFunction){
        
        if(req.body.payload.role != "COACH"){
            return res.status(401).send({message: "Unauthorized, only coachs"})
        } 

        if(req.body.payload.dni != req.body._userId){ //TODO: mejor verificar antes de crear
            return res.status(401).send({message: "Unauthorized, token not match"})
        } 
            
        next();
    }
}