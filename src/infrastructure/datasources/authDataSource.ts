import { UserEntity } from "../../domain/entities/userEntity";
import { RegisterUserDTO } from "../dtos/registerUserDTO";


export abstract class AuthDataSource{
    abstract register( registerUserDTO: RegisterUserDTO): Promise<UserEntity>;
}