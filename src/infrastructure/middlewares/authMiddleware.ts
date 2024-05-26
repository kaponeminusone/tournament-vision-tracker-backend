import { NextFunction, Request, Response } from "express";
import { JwtUtil } from "../../utils/jwt";

export class AuthMiddleware{

    static validateJWT = async ( req: Request, res: Response, next: NextFunction) =>{
        
        const authorization = req.header('Authorization');

        if( !authorization ) return res.status(401).json({message: 'No token provided'});
        if( !authorization.startsWith('Bearer ')) return res.status(401).json({message: 'Invalid Bearer Token'});

        const token = authorization.split(' ').at(1) || '';

        try {

            const payload = await JwtUtil.verifyToken(token);
            if(!payload) return res.status(401).json({message: 'Invalid Token'});

            req.body.payload = payload;

            next();
        } catch (error) {
            res.status(500).json({message: 'Internal server error'})
        }

    }

}