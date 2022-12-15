import { IMiddleware } from './middleware.interface';
import { NextFunction, Request, Response } from 'express';


export  class AuthGuard implements IMiddleware{
	exec(req:Request,res:Response,next:NextFunction):void {
		// @ts-ignore
		if (req.user){
			return next()
		}
		res.status(401).send({error:'You are not autorization'})
	}
}