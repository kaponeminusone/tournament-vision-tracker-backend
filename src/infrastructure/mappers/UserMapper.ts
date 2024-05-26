import { UserEntity } from "../../domain/entities/userEntity";


export class UserMapper{
    
    static userEntityFromObject(object: {[key: string]: any}){
        
        const { id, _id, name, email, password, role} = object;

        if(!_id && !id) throw Error("Missing id");
        if( !name ) throw Error("Missing name");
        if( !email ) throw Error("Missing name");
        if( !password ) throw Error("Missing password");
        if( !role ) throw Error("Missing role");

        return new UserEntity(
            id || _id,
            name,
            email,
            password,
            [role]
        )

    }

    static userEntityFromArray(objects: {[key: string]: any}[]){
        return objects.map(object => UserMapper.userEntityFromObject(object));
    }
}