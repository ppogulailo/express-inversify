import { User } from './dto/user.entity';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserModel } from '@prisma/client';


export interface UserServiceInterface{
	createUser:(dto:UserRegisterDto)=>Promise<UserModel|null>;
	validateUser:(dto:UserLoginDto)=>Promise<boolean>;
}