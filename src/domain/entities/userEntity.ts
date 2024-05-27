

export class UserEntity {

    constructor(
        public id: string,
        public dni: string,
        public birth: string,
        public name: string,
        public email: string,
        public password: string,
        public role: string,
    ) {}
}