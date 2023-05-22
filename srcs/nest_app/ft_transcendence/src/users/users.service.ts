import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { rejects } from 'assert';
import { resolve } from 'path';
import { nextTick } from 'process';

@Injectable()
export class UsersService {
	
	constructor (private readonly prisma:  PrismaClient) {}
 
	createUser(param: UserDTO): Promise<any> {
		return new Promise(resolve => {
			 resolve(this.prisma.user.create({
				 data: { param }
			 })
		});
	};
	
	updateUser() {

	}

}

const user = new UsersService(PrismaClient());

user.createUser().then(test => {console.log(test)});

