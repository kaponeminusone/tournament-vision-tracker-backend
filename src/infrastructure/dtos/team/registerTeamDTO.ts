import { Validators } from "../../../utils/Validators";

export class RegisterTeamDTO{
    
    private constructor(
        public coachDni: string,
        public name: string,
        public playerIds: string[]
    ){}

    static create(object: {[key: string]: any}): [string?,RegisterTeamDTO?] { // Indica retornar un [error, el objeto]

        // Definir las reglas de lo que quiero transformar, para que cumpla el DTO.
        const { _userId, _name, _playersIds} = object;

        if( !Validators.dni.test( _userId ) ) return ['Email is not valid'];

        return [
            undefined,
            new RegisterTeamDTO(
                _userId,
                _name,
                _playersIds,
            )
        ];
    }

}