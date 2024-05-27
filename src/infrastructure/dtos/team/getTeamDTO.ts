import { Validators } from "../../../utils/Validators";

export class GetTeamDTO{
    
    private constructor(
        public coachDni: string
    ){}

    static create(object: {[key: string]: any}): [string?,GetTeamDTO?] { // Indica retornar un [error, el objeto]

        // Definir las reglas de lo que quiero transformar, para que cumpla el DTO.
        const { _userId } = object;
        
        if( !Validators.dni.test( _userId ) ) return ['_userId is not valid'];
     
        return [
            undefined,
            new GetTeamDTO(
                _userId
            )
        ];
    }

}