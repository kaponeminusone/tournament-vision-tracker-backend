import { Validators } from "../../../utils/Validators";

export class DeleteTeamDTO{
    
    private constructor(
        public id: string,
        public coachDni: string,
    ){}

    static create(object: {[key: string]: any}): [string?,DeleteTeamDTO?] {

        const { _userId, _id} = object;

        //valida puro numero

        if( !Validators.dni.test( _userId ) ) return ['_userId is not valid'];
        if( !Validators.dni.test( _id ) ) return ['_id is not valid'];

        return [
            undefined,
            new DeleteTeamDTO(
                _id,
                _userId,
            )
        ];
    }

}