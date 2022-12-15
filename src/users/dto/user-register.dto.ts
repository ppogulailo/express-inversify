import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto{
	@IsEmail({},{message:"Email error;)"})
	email:string;

	@IsString({message:"Password error;)"})
	password:string;
	@IsString({message:"Name error;)"})
	name:string;
}