import { RegisterUserDTO } from "../../infrastructure/dtos/registerUserDTO";
import { AuthRepository } from "../repositories/authRepository";
import { JwtUtil } from "../../utils/jwt";
import { LoginUserDTO } from "../../infrastructure/dtos/loginUserDTO";

// Mnadrlo a llamar para que haga exactamente lo que uno quiere
// probablemente use DI

interface UserToken {
    token: string;
    user: object;
}

interface LoginUserUseCase{  //Interface para manter orden
    execute( loginUserDTO: LoginUserDTO): Promise<UserToken>
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>

export class LoginUser implements LoginUserUseCase{

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JwtUtil.generateToken
    ){}

    async execute(LoginUserDTO: LoginUserDTO): Promise<UserToken> {

        // Crear el usuario
        const { password , ...user } = await this.authRepository.login(LoginUserDTO);
       // Regresar el Token
        const token = await this.signToken({role: user.role, id: user.id, dni: user.dni}, '2h');

        if(!token) throw Error('Error generating token');

       return {

        token: token,
        user: user

       }

    }

}
