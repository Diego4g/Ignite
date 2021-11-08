export class AppError{
    public readonly message: string;

    public readonly statusCode: number;

    constructor(message: string, statusCode = 400){ // aqui nao dizemos o tipo number pois queremos retornar um default, que no caso é o 400
        this.message = message;
        this.statusCode = statusCode;
    }
}