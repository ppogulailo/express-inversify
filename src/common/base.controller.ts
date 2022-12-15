import { Router, Response } from 'express';
import { ExpressReturnType, IRouteController } from './route.interface';
import { LoggerInterface } from '../logger/logger.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';

export { Router } from 'express';

@injectable()
export abstract class BaseController {
	private readonly _router: Router;

	constructor(private logger: LoggerInterface) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	public send<T>(res: Response, code: number, message: T): ExpressReturnType {
		res.type('application/json');
		return res.status(code).json(message);
	}

	public ok<T>(res: Response, message: T): ExpressReturnType {
		return this.send<T>(res, 200, message);
	}

	public create(res: Response): ExpressReturnType {
		return res.status(201);
	}

	protected bindRoutes(routes: IRouteController[]):void {
		for (const route of routes) {
			this.logger.log(`${route.method} ${route.path}`);
			const middleware= route.middlewares?.map(m=>m.exec.bind(m))
			const handler = route.func.bind(this);
			const pipeline= middleware ? [...middleware,handler]:handler
			this.router[route.method](route.path, pipeline);
		}
	}
}
