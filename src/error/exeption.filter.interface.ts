import { NextFunction, Response, Request } from 'express';

export interface ExeptionFilterInterface {
	   catch: (err: Error, req: Request, res: Response, next: NextFunction) => void;
}
