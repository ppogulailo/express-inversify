import { IConfigServiceInterface } from './config.service.interface';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { LoggerInterface } from '../logger/logger.interface';


@injectable()
export class ConfigService implements IConfigServiceInterface {
	private config: DotenvParseOutput;

	constructor(@inject(TYPES.LoggerInterface) private logger: LoggerInterface) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.logger.error('[ConfigService].env was not find');
		} else {
			this.logger.log('[ConfigService].env was download')
			this.config = result.parsed as DotenvParseOutput;
		}
	}

	get<T extends string | number>(key: string): string {
		return this.config[key];
	}
}