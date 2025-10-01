export class User {
    constructor(
        public id: string,
        public nom: string,
        public role: "admin" | "user"
    ){}
}