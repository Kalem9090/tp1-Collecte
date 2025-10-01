import { Episode } from "./Episode";

export class Saison{
    constructor(
        public numero: number,
        public episodes: Episode[] = []
    ) {}
}