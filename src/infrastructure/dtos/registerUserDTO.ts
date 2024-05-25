import { Validators } from "../../utils/Validators";


export class RegisterUserDTO{
    
    //TODO: Para el registro se requiere identificar el rol del usuario
    
    private constructor(
        public name: string,
        public email: string,
        public password: string
    ){}

    static create(object: {[key: string]: any}): [string?,RegisterUserDTO?] { // Indica retornar un [error, el objeto]

        // Definir las reglas de lo que quiero transformar, para que cumpla el DTO.

        const { name, email, password } = object;

        if( !name ) return ['Missing name'];
        if( !email ) return ['Missing email']; 
        if( !Validators.email.test( email ) ) return ['Email is not valid'];
        if( !password ) return ['Missing password'];
        if( password.length < 4 ) return ['Password is too short'];

        return [
            undefined,
            new RegisterUserDTO(name, email, password)
        ];
    }

}