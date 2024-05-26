import { UserEntity } from "../../domain/entities/userEntity";
import { AuthRepository } from "../../domain/repositories/authRepository";
import { AuthDataSource } from "../datasources/authDataSource";
import { LoginUserDTO } from "../dtos/loginUserDTO";
import { RegisterUserDTO } from "../dtos/registerUserDTO";


// Asegura poder cambiar la pieza dataSource dependiendo de la base de datos
// Para el Auth
// TODO: asegurar este tipo de implementación para el servidor y la simulación

export class AuthRepositoryImpl implements AuthRepository{

    constructor(
        private readonly authDataSource: AuthDataSource,
    ){}

    async register(registerUserDTO: RegisterUserDTO): Promise<UserEntity> {
        try {
            return await this.authDataSource.register(registerUserDTO);

        } catch (error: any) {
            throw new Error(error);
        }
        
    }

    async login(loginUserDTO: LoginUserDTO): Promise<UserEntity> {

        try {
            return await this.authDataSource.login(loginUserDTO);

        } catch (error: any) {
            throw new Error(error);
        }
        
    }

}