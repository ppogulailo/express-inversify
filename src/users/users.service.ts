import { UserServiceInterface } from './user-service.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { User } from './dto/user.entity';
import { UserRegisterDto } from './dto/user-register.dto';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { IConfigServiceInterface } from '../config/config.service.interface';
import { IUsersRepository } from './users.repository.interface';
import { UserModel } from '@prisma/client';

@injectable()
export class UsersService implements UserServiceInterface{
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigServiceInterface,
		@inject(TYPES.UsersRepository) private usersRepository: IUsersRepository,
		) {
	}
	async createUser({email,name,password}:UserRegisterDto):Promise<UserModel | null>{
		const salt= this.configService.get('SALT')
		const newUser= new User(email,name)
		await newUser.setPassword(password,Number(salt))
		const existedUser =await this.usersRepository.find(email);
		if (existedUser){
			return null
		}

		return this.usersRepository.create(newUser)
	}

	async validateUser(dto:UserLoginDto):Promise<boolean>{
		return true
	}
}