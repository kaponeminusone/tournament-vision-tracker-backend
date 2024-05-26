
import { PrismaClient } from "@prisma/client";

export class PostgresSQLDatabase{
    
    static async connect(): Promise<any>{
        
        return await prisma.$connect();
    }
}

export const prisma: PrismaClient = new PrismaClient();