import {LoggerInterface} from "./logger/logger.interface";
import {ExeptionFilter} from "./error/exeption.filter";

export const TYPES={
    Application: Symbol.for('Application'),
    LoggerInterface: Symbol.for('LoggerInterface'),
    UsersController:Symbol.for('UsersController'),
    ExeptionFilter:Symbol.for('ExeptionFilter')

}