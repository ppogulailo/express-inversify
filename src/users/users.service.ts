import { UserServiceInterface } from './user-service.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { User } from './dto/user.entity';
import { UserRegisterDto } from './dto/user-register.dto';
import { injectable } from 'inversify';

@injectable()
export class UsersService implements UserServiceInterface{
	async createUser({email,name,password}:UserRegisterDto):Promise<User | null>{
		const newUser= new User(email,name)
		await newUser.setPassword(password)
		return newUser
	}

	async validateUser(dto:UserLoginDto):Promise<boolean>{
		return true
	}
}