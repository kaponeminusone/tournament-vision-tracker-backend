import { UserEntity } from "../../../domain/entities/userEntity";
import { AuthDataSource } from "../authDataSource";
import { RegisterUserDTO } from "../../dtos/registerUserDTO";


export class DatabaseAuthDataSource implements AuthDataSource{

    constructor(){

    }

    async register( registerUserDTO: RegisterUserDTO ): Promise<UserEntity> {
        
        const { name, email, password } = registerUserDTO;

        try {
            //TODO: Manejo de la base de datos para el register, verificar contraseña etc
            
        } catch (error) {
            // Manejo de errores
        }

        return new UserEntity(
            '1',
            name,
            email,
            password,
            ['ORGANIZADOR']
        );
    }

}