import { RegisterUserDTO } from "../../infrastructure/dtos/registerUserDTO";
import { AuthRepository } from "../repositories/authRepository";
import { JwtUtil } from "../../utils/jwt";

// Mnadrlo a llamar para que haga exactamente lo que uno quiere
// probablemente use DI

interface UserToken {
    token: string;
    user: object;
}

interface RegisterUserUseCase{  //Interface para manter orden
    execute( registerUserDTO: RegisterUserDTO): Promise<UserToken>
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>

export class RegisterUser implements RegisterUserUseCase {

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JwtUtil.generateToken
    ){}

    async execute(registerUserDTO: RegisterUserDTO): Promise<UserToken> {

        // Crear el usuario
        const { password , ...user } = await this.authRepository.register(registerUserDTO);
       // Regresar el Token
        const token = await this.signToken({role: user.role, id: user.id, dni: user.dni}, '2h');

        if(!token) throw Error('Error generating token');

       return {
        token: token,
        user: user
       }

    }

}
