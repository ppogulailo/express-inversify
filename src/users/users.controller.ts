import { BaseController } from '../common/base.controller';
import { Request, Response, NextFunction } from 'express';
import { HttpErrorClass } from '../error/http-error.class';
import { inject, injectable } from 'inversify';
import { LoggerInterface } from '../logger/logger.interface';
import { TYPES } from '../types';
import 'reflect-metadata';
import { UsersInterface } from './users.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './dto/user.entity';
import { UserServiceInterface } from './user-service.interface';
import { ValidateMiddleware } from '../common/validate.middleware';

@injectable()
export class UsersController extends BaseController implements UsersInterface {
	constructor(@inject(TYPES.LoggerInterface) private loggerService: LoggerInterface,
							@inject(TYPES.UserService) private userService:UserServiceInterface
							) {
		super(loggerService);
		this.bindRoutes([
			{ path: '/register', method: 'post', func: this.register,middlewares:[new ValidateMiddleware(UserRegisterDto)] },
			{ path: '/login', method: 'post', func: this.login },
		]);
	}

	login(req: Request<{},{},UserLoginDto>, res: Response, next: NextFunction) :void{
		next(new HttpErrorClass('Error login', 401, 'login'));
	}
	async register({ body }: Request<{},{},UserRegisterDto>, res: Response, next: NextFunction) :Promise<void>{
		const result = await this.userService.createUser(body)
		if (!result){
			return next(new HttpErrorClass('Error, this User was created begin',422))
		}
		this.ok(res, { email:result.email });
	}
}
