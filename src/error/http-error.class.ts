export class HttpErrorClass extends Error {
    statusCode: number;
    context?: string;

    constructor(message: string, statusCode: number, context?: string) {
        super(message);
        this.message=message
        this.statusCode=statusCode
        this.context=context
    }
}