export class Transaction{
    constructor(
        public description: string,
        public amount: number,
        public category: string,
        public date: Date,
    ){}
}