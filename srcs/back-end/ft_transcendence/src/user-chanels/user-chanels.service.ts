import { Injectable } from '@nestjs/common';
import { AddUserChanel } from './dto/add-user-chanel.input';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateChanelUserInput } from './dto/update-chanel-user.input';

@Injectable()
export class UserChanelsService {

	constructor(private readonly prisma: PrismaService) {}

	async findMyChanels(user_id: number, private_chan: boolean) { 
		return this.prisma.users_Chanels.findMany({
			where: { 
				user_id,
				pending: false,
				chanel: { private: private_chan }
			} 
		});
	}

	async findMyRequestChanels(user_id: number) {
		return this.prisma.users_Chanels.findMany({
			where: {user_id, pending: true}
		});
	}

	async addUser(input: AddUserChanel) {
		return this.prisma.users_Chanels.create({
		data : {
		  user: { connect: { id: input.user_id } },
		  chanel: { connect: { id: input.chanel_id } }
		}
		})
	}

	async acceptRequest(Requestkey: UpdateChanelUserInput) {
		return this.prisma.users_Chanels.update({
			where: {user_id_chanel_id: Requestkey},
			data: {pending: false}
		})
	}
	
	async delete(key: UpdateChanelUserInput) {
		return this.prisma.users_Chanels.delete({
			where: {
				user_id_chanel_id: key
			}
		});
	}
}
