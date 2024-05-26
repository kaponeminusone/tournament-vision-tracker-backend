
import { UserEntity } from "../../../../domain/entities/userEntity";
import { prisma, roleEnum } from "../../../database/postgresql";
import { Role } from "@prisma/client";
import { UserMapper } from "../../../mappers/UserMapper";

interface CreateTeamDTO {
    name: string;
    coachId: string;
    playerIds: string[];
}

export class DatabaseProof{

    constructor(){}

    async proof(proof: CreateTeamDTO): Promise<any> {

        
    }

    async getUsers(): Promise<UserEntity[]>{
        try {
            const users = await prisma.user.findMany();
            return UserMapper.userEntityFromArray(users);
        } catch (error: any) {
            throw new Error(`Failed to get Users ${error.message}`)
        }
    }

    async createTeam(proof: CreateTeamDTO): Promise<any> {

        //TODO Team -> endpoint -> Service -> Repository etc..

        const { name, coachId, playerIds } = proof;
        try {

            // Verificar si el usuario es un técnico válido
            const coach = await prisma.user.findUnique({
                where: { dni: coachId },
            });

            if (!coach || coach.role !== 'COACH') {
                throw new Error('Invalid coach ID or user is not a coach');
            }
    
            // Verificar si todos los jugadores existen
            const players = await prisma.user.findMany({
                where: {
                    dni: { in: playerIds }
                }
            });
    
            if (players.length !== playerIds.length) {
                throw new Error('Some players do not exist');
            }
    
            // Paso 1: Crear el equipo
            const createdTeam = await prisma.team.create({
                data: {
                    name: name,
                    coachId: coach.id,
                },
            });
    
            // Paso 2: Asignar el equipo a cada usuario -> jugador
            const playerUpdates = playerIds.map(async (playerId) => {
                await prisma.user.update({
                    where: { dni: playerId },
                    data: {
                        Player: {
                            create: {
                                team: {
                                    connect: { id: createdTeam.id }
                                }
                            }
                        }
                    }
                });
            });
    
            await Promise.all(playerUpdates);
    
            return createdTeam;

        } catch (error: any) {
            throw new Error(`Failed in proof: ${error.message}`);
        }
    }
}