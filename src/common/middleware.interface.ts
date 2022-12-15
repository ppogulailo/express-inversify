import { NextFunction,Request,Response } from 'express';

export interface IMiddleware{
	exec:(req:Request,res:Response,next:NextFunction)=>void
}