export class Episode {
    constructor(
        public id: string,
        public titre: string,
        public numero: number,
        public duree: number,
        public watched: boolean = false,

    ) {}
}