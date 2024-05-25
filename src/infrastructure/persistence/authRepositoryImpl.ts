import { UserEntity } from "../../domain/entities/userEntity";
import { AuthRepository } from "../../domain/repositories/authRepository";
import { AuthDataSource } from "../datasources/authDataSource";
import { RegisterUserDTO } from "../dtos/registerUserDTO";


// Asegura poder cambiar la pieza dataSource dependiendo de la base de datos
// Para el Auth
// TODO: asegurar este tipo de implementación para el servidor y la simulación

export class AuthRepositoryImpl implements AuthRepository{

    constructor(
        private readonly authDataSource: AuthDataSource,
    ){}

    register(registerUserDTO: RegisterUserDTO): Promise<UserEntity> {
        return this.authDataSource.register(registerUserDTO);
    }

}