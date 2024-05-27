
import { prisma } from "../../../database/postgresql";
import { TeamDataSource } from "../../teamDataSource";
import { TeamEntity } from "../../../../domain/entities/teamEntity";
import { DeleteTeamDTO } from "../../../dtos/team/deleteTeamDTO";
import { GetTeamDTO } from "../../../dtos/team/getTeamDTO";
import { RegisterTeamDTO } from "../../../dtos/team/registerTeamDTO";
import { TeamMapper } from "../../../mappers/teamMapper";


export class DatabaseTeamDataSource implements TeamDataSource{

    constructor(){}
    async register(registerTeamDTO: RegisterTeamDTO): Promise<TeamEntity> {
        const { name, coachDni, playerIds } = registerTeamDTO;

        try {
            // Verificar si el usuario es un técnico válido
            const coach = await prisma.user.findUnique({
                where: { dni: coachDni },
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

            // Verificar si todos los jugadores existen
            const playersInPlayers = await prisma.player.findMany({
                where: {
                    userId: { in: players.map((player => player.id)) }
                }
            });

            if (playersInPlayers.length >= 1) {
                throw new Error('Some player already in 1 team');
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

            return TeamMapper.teamEntityFromObject(createdTeam);

        } catch (error: any) {
            throw new Error(`Failed in proof: ${error.message}`);
        }
    }

    async delete(deleteTeamDTO: DeleteTeamDTO): Promise<TeamEntity> {

        const { id, coachDni } = deleteTeamDTO;
  
        try {
            // Verificar si el usuario es un técnico válido
            const coach = await prisma.user.findUnique({
                where: { dni: coachDni },
            });

            if (!coach || coach.role !== 'COACH') {
                throw new Error('Invalid coach ID or user is not a coach');
            }

            // Verificar si el equipo existe y pertenece al técnico
            const team = await prisma.team.findUnique({
                where: { id: parseInt(id) },
                include: { players: true }
            });

            if (!team || team.coachId !== coach.id) {
                throw new Error('Team not found or coach does not have permission to delete this team');
            }

            // Eliminar el equipo y las relaciones de jugadores en cascada
            const deletedTeam = await prisma.team.delete({
                where: { id: team.id },
                include: { players: true }
            });

            return TeamMapper.teamEntityFromObject(deletedTeam);

        } catch (error: any) {
            throw new Error(`Failed to delete team: ${error.message}`);
        }
    }

    async getAll(getTeamDTO: GetTeamDTO): Promise<any> {
        const { coachDni } = getTeamDTO;

        try {
            // Verificar si el usuario es un técnico válido
            const coach = await prisma.user.findUnique({
                where: { dni: coachDni },
            });

            if (!coach || coach.role !== 'COACH') {
                throw new Error('Invalid coach ID or user is not a coach');
            }

            // Obtener todos los equipos asociados a este técnico
            const teams = await prisma.team.findMany({
                where: { coachId: coach.id },
                include: {
                    players: {
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    name: true,
                                    email: true,
                                    role: true,
                                    birthDate: true,
                                    dni: true,
                                },
                            },
                        },
                    },
                },
            });

            // return teams.map(team => TeamMapper.teamEntityFromObject(team)); //TODO: Mapeo criminal
            return teams;

        } catch (error: any) {
            throw new Error(`Failed to get teams: ${error.message}`);
        }
    }

}