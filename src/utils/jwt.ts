import jwt from 'jsonwebtoken'
import { envs } from '../config/envs';

export class JwtUtil{
    
    static async generateToken(
        payload: Object, 
        duration: string = '2h'): Promise<string | null>{
        
        return new Promise( ( resolve ) => {

            jwt.sign(payload, envs.JWT_SECRET , {expiresIn: duration}, (err, token) => {

                if ( err ) return resolve(null);

                resolve(token!);
            })

        });
    }

    static async verifyToken(token: string) {

        return new Promise( ( resolve ) => {

            jwt.verify(token,envs.JWT_SECRET, (err, decoded) => {

                if ( err ) return resolve(null);

                resolve(decoded);
            })

        })

    }
}
