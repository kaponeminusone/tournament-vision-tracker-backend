import * as dotenv from 'dotenv'
import * as envVar from 'env-var'
import path from 'path';

dotenv.config({path: path.resolve(__dirname,'../../.env')});

export const envs = { 
    PORT : envVar.get('PORT').required().asPortNumber(),

    DB_USER: envVar.get('DB_USER').required().asString(),
    DB_PASSWORD: envVar.get('DB_PASSWORD').required().asString(),
    DB_HOST: envVar.get('DB_HOST').required().asString(),
    DB_NAME: envVar.get('DB_NAME').required().asString(),
    DB_PORT: envVar.get('DB_PORT').required().asString(),

    JWT_SECRET: envVar.get('DB_PORT').required().asString(),
    
    SOCKET_PORT: envVar.get('SOCKET_PORT').required().asString(),

};