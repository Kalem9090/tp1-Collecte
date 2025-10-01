import { Media } from "./Media";

export class Film extends Media {
    constructor(
        id: string,
        titre: string,
        plateforme: string,
        userId: string,
        public duree: number,
        public genre: string,
        public annee: number
    ){
        super(id, titre, plateforme, userId);
    }       

    
}