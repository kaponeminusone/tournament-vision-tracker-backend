import { Validators } from "../../../utils/Validators";


export class LoginUserDTO{
    
    private constructor(
        public dni: string,
        public password: string,
    ){}

    static create(object: {[key: string]: any}): [string?,LoginUserDTO?] { // Indica retornar un [error, el objeto]

        // Definir las reglas de lo que quiero transformar, para que cumpla el DTO.
        const { _password, _userId} = object;

        if( !Validators.dni.test( _userId ) ) return ['_userId is not valid'];
        if( !_password ) return ['Missing password'];
        if( _password.length < 4 ) return ['Password is too short'];

        return [
            undefined,
            new LoginUserDTO(
                _userId,
                _password,
            )
        ];
    }

}