import { IMiddleware } from './middleware.interface';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export class MiddlewareAuth implements IMiddleware {

	constructor(private secret: string) {
	}

//Incorrect AutorizationMiddleware
	exec(req: Request, res: Response, next: NextFunction) {
		if (req.headers.authorization) {
			verify(req.headers.authorization.split(' ')[1], this.secret, (err, payload) => {
				if (err) {
					next();
				} else if (payload) {
					// @ts-ignore
					req.user = payload.email;
					next();
				}
			});
		} else next();
	}
}