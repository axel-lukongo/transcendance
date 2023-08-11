import { Injectable } from '@nestjs/common';
import { AddUserChanel } from './dto/add-user-chanel.input';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateChanelUserInput } from './dto/update-chanel-user.input';
import { UsersChanels } from './entities/user_chanel.entity';
import { User } from 'src/users/entities/user.entity';
@Injectable()
export class UserChanelsService {

	constructor(private readonly prisma: PrismaService) {}

	async findMyChanels(user_id: number, private_chan: boolean) {
		return this.prisma.users_Chanels.findMany({
			where: {
				user_id,
				pending: false,
				chanel: { private: private_chan, directMsg: false }
			}
		});
	}


	async findMyRequestChanels(user_id: number) {
		return this.prisma.users_Chanels.findMany({
			where: {user_id, pending: true, chanel: { directMsg: false }}
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
		  where: {
			user_id_chanel_id: {
			  user_id: Requestkey.user_id,
			  chanel_id: Requestkey.chanel_id,
			},
		  },
		  data: {
			pending: false,
			is_muted: Requestkey.is_muted, // Assurez-vous que cette propriété existe dans UpdateChanelUserInput
			is_admin: Requestkey.is_admin, // Assurez-vous que cette propriété existe dans UpdateChanelUserInput
		  },
		});
	}
	  


	async update(key: UpdateChanelUserInput) {
	const currentTimeInMillis = Math.floor(new Date().getTime() / 60000);
		const updatedUsersChanels = await this.prisma.users_Chanels.update({
		  where: {
			user_id_chanel_id: {
				user_id: key.user_id,
				chanel_id: key.chanel_id,
			},
		},
		  data: {
			pending: false,
			is_muted: key.is_muted,
			is_admin: key.is_admin,
			mute_start_time: key.is_muted === true? currentTimeInMillis: 0,
		  },
		});
		return updatedUsersChanels;
	}



	async isAdministrator(key: UpdateChanelUserInput, userID: number): Promise<boolean> {
		const chan_executor = await this.prisma.users_Chanels.findUnique({
			where: {
				user_id_chanel_id: {
					user_id: userID,
					chanel_id: key.chanel_id
				},
			},
		})
		if(chan_executor.is_admin) {
			return true;
		}
		else{
			return false;
		}
	}

	async findMembersOfChan(channel_id: number){
		return await this.prisma.users_Chanels.findMany({
			where: {
					chanel_id: channel_id
			},
			include: { user: true }
		})
	}

	async delete(key: UpdateChanelUserInput) {
		return this.prisma.users_Chanels.delete({
			where: {
				user_id_chanel_id: {
					user_id: key.user_id,
					chanel_id: key.chanel_id,
				},
			}
		});
	}
}
