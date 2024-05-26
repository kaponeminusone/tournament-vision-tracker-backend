import { Validators } from "../../utils/Validators";


export class RegisterUserDTO{
    
    //TODO: Para el registro se requiere identificar el rol del usuario
    
    private constructor(
        public name: string,
        public dni: string,
        public birth: string,
        public email: string,
        public password: string,
        public role: string
    ){}

    static create(object: {[key: string]: any}): [string?,RegisterUserDTO?] { // Indica retornar un [error, el objeto]

        // Definir las reglas de lo que quiero transformar, para que cumpla el DTO.

        const { _name, _email, _password, _birthDay, _userId, _userType} = object;

        if( !_name ) return ['Missing _name'];
        if( !_userType ) return ['Missing _userType'];
        if( !_email ) return ['Missing _email']; 
        if( !Validators.email.test( _email ) ) return ['_email is not valid'];
        if( !Validators.date.test( _birthDay ) ) return ['_birthDay is not valid'];
        if( !Validators.dni.test( _userId ) ) return ['Email is not valid'];
        if( !_password ) return ['Missing password'];
        if( _password.length < 4 ) return ['Password is too short'];
        if (![1, 2, 3].includes(parseInt((_userType as string)))) return ['_userType is not valid'];

        return [
            undefined,
            new RegisterUserDTO(
                _name,
                _userId,
                _birthDay,
                _email,
                _password,
                _userType
            )
        ];
    }

}