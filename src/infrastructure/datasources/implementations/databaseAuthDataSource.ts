import { UserEntity } from "../../../domain/entities/userEntity";
import { AuthDataSource } from "../authDataSource";
import { RegisterUserDTO } from "../../dtos/registerUserDTO";
import { prisma } from "../../database/postgresql";
import { BcryptUtil } from "../../../utils/bcrypt";
import { UserMapper } from "../../mappers/UserMapper";

// Para poder tener una firma, que me diga que necesito este formato
type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class DatabaseAuthDataSource implements AuthDataSource{

    constructor(
        private readonly hashPassword: HashFunction = BcryptUtil.hash,
        private readonly comparePassword: CompareFunction = BcryptUtil.compare
    ){}

    async register( registerUserDTO: RegisterUserDTO ): Promise<UserEntity> {
        
        const { name, email, password } = registerUserDTO;

        try {
            // 1. Buscar en la base de datos si ya existe el email
            const exists = await prisma.user.findFirst({
                where: { email }
            });

            if(exists) throw new Error("User with this email already exists");

            // TODO: ajustar el role
            const newUser = await prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    password: this.hashPassword(password),
                    role: "TECNICO"
                }
            });

            return UserMapper.userEntityFromObject(newUser);


        } catch (error: any) {
            throw new Error(`Failed to register: ${error.message}`);
        }
    }

}