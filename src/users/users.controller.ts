import {BaseController} from "../common/base.controller";
import {Request,Response,NextFunction} from "express";
import {LoggerService} from "../logger/logger.service";
import {HttpErrorClass} from "../error/http-error.class";
import {inject, injectable} from "inversify";
import {LoggerInterface} from "../logger/logger.interface";
import {TYPES} from "../types";
import 'reflect-metadata'

@injectable()
export class UsersController extends BaseController{
    constructor(@inject(TYPES.LoggerInterface) private loggerService:LoggerInterface) {
        super(loggerService);
        this.bindRoutes([
            {path:'/register',method:'post',func:this.register},
            {path:'/login',method:'post',func:this.login},
        ])
    }

    login(req:Request,res:Response,next:NextFunction){
        next(new HttpErrorClass('Error login',401,'login'))
    }
    register(req:Request,res:Response,next:NextFunction){
        this.ok(res,'register')
    }
}