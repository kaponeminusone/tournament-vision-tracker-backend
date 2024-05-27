import { UserEntity } from "../../../../domain/entities/userEntity";
import { AuthDataSource } from "../../authDataSource";
import { RegisterUserDTO } from "../../../dtos/auth/registerUserDTO";
import { prisma, roleEnum } from "../../../database/postgresql";
import { BcryptUtil } from "../../../../utils/bcrypt";
import { LoginUserDTO } from "../../../dtos/auth/loginUserDTO";
import { UserMapper } from "../../../mappers/userMapper";

// Para poder tener una firma, que me diga que necesito este formato
type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class DatabaseAuthDataSource implements AuthDataSource{

    constructor(
        private readonly hashPassword: HashFunction = BcryptUtil.hash,
        private readonly comparePassword: CompareFunction = BcryptUtil.compare
    ){}

    async register( registerUserDTO: RegisterUserDTO ): Promise<UserEntity> {
        
        const { dni , birth ,name, email, password, role } = registerUserDTO;

        try {
            // 1. Buscar en la base de datos si ya existe el email
            const exists = await prisma.user.findFirst({
                where: { email }
            });

            if(exists) throw new Error("User with this email already exists");

            const existsDni = await prisma.user.findFirst({
                where: { dni }
            });

            if(existsDni) throw new Error("User with this DNI already exists");

            const roleIndex = parseInt(role);
            if (isNaN(roleIndex) || roleIndex < 1 || roleIndex > Object.keys(roleEnum).length) {
                throw new Error('Invalid role');
            }
            const userRole = roleEnum[Object.keys(roleEnum)[roleIndex - 1] as keyof typeof roleEnum];

            const newUser = await prisma.user.create({
                data: {
                    dni: dni,
                    birthDate: birth,
                    name: name,
                    email: email,
                    password: this.hashPassword(password),
                    role: userRole
                }
            });

            return UserMapper.userEntityFromObject(newUser);

        } catch (error: any) {
            throw new Error(`Failed to register: ${error.message}`);
        }
    }

    async login( loginUserDTO: LoginUserDTO ): Promise<UserEntity> {
        
        const { dni , password} = loginUserDTO;

        try {
            // 1. Buscar en la base de datos si ya existe el email
            const exists = await prisma.user.findFirst({
                where: { dni }
            });

            if(!exists) throw new Error("This user not Found");

            if(!this.comparePassword(password,exists.password)) throw new Error("Incorrect password");

            return UserMapper.userEntityFromObject(exists);

        } catch (error: any) {
            throw new Error(`Failed to register: ${error.message}`);
        }
    }

}