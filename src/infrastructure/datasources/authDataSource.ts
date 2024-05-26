import { UserEntity } from "../../domain/entities/userEntity";
import { LoginUserDTO } from "../dtos/loginUserDTO";
import { RegisterUserDTO } from "../dtos/registerUserDTO";


export abstract class AuthDataSource{
    abstract register( registerUserDTO: RegisterUserDTO): Promise<UserEntity>;
    abstract login( loginUserDTO: LoginUserDTO): Promise<UserEntity>;
}