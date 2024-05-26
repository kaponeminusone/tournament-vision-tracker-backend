import { LoginUserDTO } from "../../infrastructure/dtos/loginUserDTO";
import { RegisterUserDTO } from "../../infrastructure/dtos/registerUserDTO";
import { UserEntity } from "../entities/userEntity";

// Se permite este tipo de utilización desde infrastructura ya que es un DTO
export interface AuthRepository{
    register( registerUserDTO: RegisterUserDTO): Promise<UserEntity>;
    login( loginUserDTO: LoginUserDTO): Promise<UserEntity>;
}