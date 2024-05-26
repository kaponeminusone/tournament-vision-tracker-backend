import { UserEntity } from "../../domain/entities/userEntity";


export class UserMapper{
    
    static userEntityFromObject(object: {[key: string]: any}){
        
        const { id, _id, name, email, password, role, birthDate, dni} = object;

        if(!_id && !id) throw Error("Missing id");
        if( !dni ) throw Error("Missing dni");
        if( !name ) throw Error("Missing name");
        if( !birthDate ) throw Error("Missing birthDay");
        if( !email ) throw Error("Missing name");
        if( !password ) throw Error("Missing password");
        if( !role ) throw Error("Missing role");

        return new UserEntity(
            id || _id,
            dni,
            birthDate,
            name,
            email,
            password,
            role
        )

    }

    static userEntityFromArray(objects: {[key: string]: any}[]){
        return objects.map(object => UserMapper.userEntityFromObject(object));
    }
}