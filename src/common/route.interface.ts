import { NextFunction, Response, Request, Router } from 'express';
import { interfaces } from 'inversify';
import Middleware = interfaces.Middleware;
import { IMiddleware } from './middleware.interface';

export interface IRouteController {
	path: string;
	func: (req: Request, res: Response, next: NextFunction) => void;
	method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
	middlewares?:IMiddleware[]
}

export type ExpressReturnType= Response<any, Record<string, any>>