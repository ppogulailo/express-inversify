import { NextFunction, Request, Response } from 'express';
import { IMiddleware } from './middleware.interface';

export class ValidateMiddleware implements IMiddleware{
	exec(req:Request,res:Response,next:NextFunction){

	}
}