
import { AuthRepository } from "../../domain/repositories/authRepository";
import { LoginUser } from "../../domain/usecases/loginUserUseCase";
import { RegisterUser } from "../../domain/usecases/registerUserUseCase";
import { LoginUserDTO } from "../../infrastructure/dtos/loginUserDTO";
import { RegisterUserDTO } from "../../infrastructure/dtos/registerUserDTO";
export class AuthService {
    constructor(private readonly authRepository: AuthRepository) {}

    async register(registerUserDTO: RegisterUserDTO): Promise<any> {
        try {
            const registerUser = new RegisterUser(this.authRepository);
            const data = await registerUser.execute(registerUserDTO);
            return data;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async login(loginUserDTO: LoginUserDTO): Promise<any> {
        try {
            const loginUser = new LoginUser(this.authRepository);
            const data = await loginUser.execute(loginUserDTO);
            return data;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}