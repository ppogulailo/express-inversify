import {Router,Response} from "express";
import {IRouteController} from "./route.interface";
import {LoggerInterface} from "../logger/logger.interface";
import {injectable} from "inversify";
import 'reflect-metadata'
export {Router} from 'express'

@injectable()
export abstract class BaseController {
    private readonly _router: Router

    constructor(private logger: LoggerInterface) {
        this._router = Router()
    }

    get router() {
        return this._router
    }

    public send<T>(res:Response,code:number,message:T){
        res.type('application/json')
        return res.status(code).json(message)
        console.log('2')
    }
    public ok<T>(res:Response,message:T){
        return this.send<T>(res,200,message)
    }


    public create(res:Response){
       return  res.status(201)
    }

    protected bindRoutes(routes: IRouteController[]) {
        for (const route of routes) {
            this.logger.log(`${route.method} ${route.path}`)
            const handler = route.func.bind(this)
            this.router[route.method](route.path, handler)
        }
    }
}