import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';
import { ExeptionFilter } from './error/exeption.filter';
import { Container, ContainerModule, interfaces } from 'inversify';
import { LoggerInterface } from './logger/logger.interface';
import { TYPES } from './types';
import { ExeptionFilterInterface } from './error/exeption.filter.interface';
import { UsersInterface } from './users/users.interface';
import { UsersService } from './users/users.service';
import { IConfigServiceInterface } from './config/config.service.interface';
import { ConfigService } from './config/config.service';
import { PrismaService } from './database/prisma.service';
import { IUsersRepository } from './users/users.repository.interface';
import {UsersRepository} from './users/users.repository'

export interface IBootStrap {
	app: App;
	appContainer:Container;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<LoggerInterface>(TYPES.LoggerInterface).to(LoggerService).inSingletonScope();
	bind<ExeptionFilterInterface>(TYPES.ExeptionFilter).to(ExeptionFilter).inSingletonScope();
	bind<UsersService>(TYPES.UserService).to(UsersService).inSingletonScope();
	bind<UsersController>(TYPES.UsersController).to(UsersController).inSingletonScope();
	bind<IConfigServiceInterface>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope();
	bind<App>(TYPES.Application).to(App);
});

function bootstrap():IBootStrap {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { app, appContainer };
}

export const { app, appContainer } = bootstrap();
