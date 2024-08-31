export class Transaction{
    constructor(
        public id : number,
        public description: string,
        public amount: number,
        public category: string,
        public date: Date,
    ){}
}