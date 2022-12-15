import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto{
	@IsEmail({},{message:"Email error;)"})
	email:string;
	@IsString({message:"Password error;)"})
	password:string;
}