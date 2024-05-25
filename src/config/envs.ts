import * as dotenv from 'dotenv'
import * as envVar from 'env-var'
import path from 'path';

dotenv.config({path: path.resolve(__dirname,'../.env')});

export const envs = { 
    PORT : envVar.get('PORT').required().asPortNumber()
};