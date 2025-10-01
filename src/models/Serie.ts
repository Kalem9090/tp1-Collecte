import { Media } from "./Media";
import { Saison } from "./Saison";

export class Serie extends Media {
    constructor(
        id: string,
        titre: string,
        plateforme: string,
        userId: string,
        public statut: "en_atente" | "en_cours" | "terminee",
        public saisons: Saison[] = []
    ){
        super(id, titre, plateforme, userId);
    }
}