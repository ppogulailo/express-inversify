import {Response, Request, NextFunction} from "express";
import {ExeptionFilterInterface} from "./exeption.filter.interface";
import {HttpErrorClass} from "./http-error.class";
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import {LoggerInterface} from "../logger/logger.interface";
import 'reflect-metadata'
@injectable()
export class ExeptionFilter implements ExeptionFilterInterface {
    constructor(@inject(TYPES.LoggerInterface)private logger: LoggerInterface) {}

    catch(err: Error | HttpErrorClass, req: Request, res: Response, next: NextFunction) {
        if (err instanceof HttpErrorClass) {
            this.logger.error(`[${err.context}] Error ${err.statusCode}  ${err.message}`)
            res.status(err.statusCode).send({err: err.message})
        } else {
            this.logger.error(`${err.message}`)
            res.status(500).send({err: err.message})
        }
    }
}