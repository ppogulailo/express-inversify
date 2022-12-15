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


export interface IBootStrap {
	app: App;
	appContainer:Container;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<LoggerInterface>(TYPES.LoggerInterface).to(LoggerService);
	bind<ExeptionFilterInterface>(TYPES.ExeptionFilter).to(ExeptionFilter);
	bind<UsersService>(TYPES.UserService).to(UsersService);
	bind<UsersController>(TYPES.UsersController).to(UsersController);
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
