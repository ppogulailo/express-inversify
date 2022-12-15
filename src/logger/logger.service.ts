import { Logger } from 'tslog';
import { LoggerInterface } from './logger.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';
@injectable()
export class LoggerService implements LoggerInterface {
	public logger: Logger<any>;

	constructor() {
		this.logger = new Logger();
	}

	log(...args: unknown[]):void {
		this.logger.info(...args);
	}

	error(...args: unknown[]):void {
		this.logger.error(...args);
	}

	warn(...args: unknown[]):void {
		this.logger.warn(...args);
	}
}
