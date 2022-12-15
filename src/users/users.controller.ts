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
import { UserServiceInterface } from './user-service.interface';
import { ValidateMiddleware } from '../common/validate.middleware';
import { sign } from 'jsonwebtoken';
import { IConfigServiceInterface } from '../config/config.service.interface';
import { AuthGuard } from '../common/auth.guard';

@injectable()
export class UsersController extends BaseController implements UsersInterface {
	constructor(@inject(TYPES.LoggerInterface) private loggerService: LoggerInterface,
							@inject(TYPES.UserService) private userService: UserServiceInterface,
							@inject(TYPES.ConfigService) private configService: IConfigServiceInterface,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middlewares: [new ValidateMiddleware(UserLoginDto)],
			},
			{
				path: '/info',
				method: 'get',
				func: this.info,
				middlewares: [new AuthGuard()],
			},
		]);
	}

	async login({ body }: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): Promise<void> {
		const result = await this.userService.validateUser(body);
		if (!result) {
			return next(new HttpErrorClass('Error, this User was not found', 401));
		}
		const jwt =await this.signJWT(body.email,this.configService.get('SECRET'))
		this.ok(res, {jwt});
	}

	async register({ body }: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction): Promise<void> {
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(new HttpErrorClass('Error, this User was created begin', 422));
		}
		this.ok(res, { email: result.email, id: result.id });
	}
	// @ts-ignore
	async info({ user }: Request, res: Response, next: NextFunction): Promise<void> {
		const  userInfo = await this.userService.getUserInfo(user)
		this.ok(res, { email: userInfo?.email, id:userInfo?.id });
	}


	private signJWT(email: string, secret: string):Promise<string> {
		return new Promise((resolve, reject) => {
			sign({
				email,
				iat: Math.floor(Date.now() / 1000),
			}, secret, { algorithm: 'HS256' }, (error, encoded) => {
				if (error) {
					reject(error)
				}
					resolve(encoded as string	)

			});
		});

	}
}
