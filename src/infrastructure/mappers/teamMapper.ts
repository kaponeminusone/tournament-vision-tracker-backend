import { TeamEntity } from "../../domain/entities/teamEntity";


export class TeamMapper{
    
    static teamEntityFromObject(object: {[key: string]: any}){
        
        const { id, _id, name, coachId} = object;

        if(!_id && !id) throw Error("Missing id");
        if( !coachId ) throw Error("Missing dni");
        if( !name ) throw Error("Missing name");
       
        return new TeamEntity(
            id || _id,
            name,
            coachId
        )
    }

    static teamEntityFromArray(objects: {[key: string]: any}[]){
        return objects.map(object => TeamMapper.teamEntityFromObject(object));
    }
}