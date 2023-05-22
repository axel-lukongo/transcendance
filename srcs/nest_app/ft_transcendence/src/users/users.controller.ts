import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor (private readonly serv: UsersService) {}

	
	@Get()
	findAll() {
		return "this is my test";
	}

	@Post()
	creatUser(UserDTO)
	{
		this.serv.createUser(UserDTO);
	}
}

export class UserDTO {
	@IsString
	nickname;

	@isNumber
	age;

	@isString
	email;
	
}