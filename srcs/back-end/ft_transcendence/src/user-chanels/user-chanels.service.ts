import { Injectable } from '@nestjs/common';
import { AddUserChanel } from './dto/add-user-chanel.input';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateChanelUserInput } from './dto/update-chanel-user.input';

@Injectable()
export class UserChanelsService {

	constructor(private readonly prisma: PrismaService) {}

	async findMyChanels(user_id: number, private_chan: boolean) {

		if (private_chan === true) {
			return this.prisma.chanel.findMany({
				where: {
					private: private_chan,
					directMsg: false,
					users: {
						some: {
							user_id: user_id,
						}
					},
				}
			});
		}
		else {
			return this.prisma.chanel.findMany({
				where: {
						private: private_chan,
						directMsg: false,
					}
			});
		}
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



	async isAdministrator(channel_id: number, userID: number): Promise<boolean> {
		const chan_executor = await this.prisma.users_Chanels.findUnique({
			where: {
				user_id_chanel_id: {
					user_id: userID,
					chanel_id: channel_id,
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

	async delete(key: UpdateChanelUserInput, userID: number){

		const channel = await this.prisma.chanel.findUnique({
			where: {
				id: key.chanel_id,
			}
		});


		if((userID === channel.owner_id) && (userID === key.user_id)){

			const test = await this.prisma.users_Chanels.deleteMany({
				where: {
					chanel_id: channel.id
				}
			});

			await this.prisma.chanel.delete({
				where: {
					id: key.chanel_id
				}
			})

			return key;
		}
		const test2 = await this.prisma.users_Chanels.delete({
			where: {
				user_id_chanel_id: {
					user_id: key.user_id,
					chanel_id: key.chanel_id,
				},
			}
		});
		return test2
	}


	async UserBanInChannel(userId: number, channelId: number){
		const userChannel = await this.prisma.user_banned.findFirst({
		  where: {
			user_id: userId,
			channel_id: channelId,
		  },
		});
		if(userChannel)
		return true;
		
		return false;
	
	}


	async IsOwnerInChannel( userId: number, channelId: number){
		const is_owner = await this.prisma.users_Chanels.findFirst({where: {
			user_id: userId,
			chanel_id: channelId,
			pending: false,
			chanel: {
				owner_id: userId
			}
		},
	})
	// console.log('le owner ===>>>> ',is_owner)
	if(is_owner)
		return true;
	return false;
	};

}
