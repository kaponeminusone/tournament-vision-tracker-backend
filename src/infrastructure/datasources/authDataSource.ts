import { UserEntity } from "../../domain/entities/userEntity";
import { LoginUserDTO } from "../dtos/auth/loginUserDTO";
import { RegisterUserDTO } from "../dtos/auth/registerUserDTO";


export abstract class AuthDataSource{
    abstract register( registerUserDTO: RegisterUserDTO): Promise<UserEntity>;
    abstract login( loginUserDTO: LoginUserDTO): Promise<UserEntity>;
}
