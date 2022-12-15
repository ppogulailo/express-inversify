import { LoggerInterface } from './logger/logger.interface';
import { ExeptionFilter } from './error/exeption.filter';
import { ConfigService } from './config/config.service';

export const TYPES = {
	Application: Symbol.for('Application'),
	LoggerInterface: Symbol.for('LoggerInterface'),
	UserService: Symbol.for('UserService'),
	UsersController: Symbol.for('UsersController'),
	ExeptionFilter: Symbol.for('ExeptionFilter'),
	ConfigService: Symbol.for('ConfigService'),
	PrismaService: Symbol.for('PrismaService'),
	UsersRepository: Symbol.for('UsersRepository'),
};
