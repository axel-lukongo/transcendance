import { Injectable } from '@nestjs/common';
import { CreateChanelInput } from './dto/create-chanel.input';
import { UpdateChanelInput } from './dto/update-chanel.input';
import { PrismaService } from 'prisma/prisma.service';
import { Chanel } from './entities/chanel.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ChanelService {
	constructor(private readonly prisma: PrismaService,
              private readonly user: UsersService) {}

  async create(createChanelInput: CreateChanelInput) {
    try{

      let chanelRes = await this.prisma.chanel.create({
        data: createChanelInput,
      })

      let user_chanel = await this.prisma.users_Chanels.create({
        data: {
          chanel_id: chanelRes.id,
          user_id: chanelRes.owner_id,
          pending: false,
		  is_admin: true,
		  is_muted: false,
        }
      })

      return chanelRes;
    }
    catch (e){
      return new Error("Error during chanel creation: " +  e);
    }
  }

  async findOne(id: number) {
    return this.prisma.chanel.findUnique({where: {id: id}});
  }

  async update(id: number, data: UpdateChanelInput): Promise<Chanel> {
    return this.prisma.chanel.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.chanel.delete({where: {id: id}});
  }

  async getOwnChanels(user_id: number) {
    return this.prisma.chanel.findMany({where: {owner_id: user_id}});
  }

  async getChannelByOwnersAndInterlocutor(userId1: number, userId2: number): Promise<Chanel | null> {
    return this.prisma.chanel.findFirst({
      where: {
        OR: [
          {
            owner_id: userId1,
            interlocutor_id: userId2,
          },
          {
            owner_id: userId2,
            interlocutor_id: userId1,
          },
        ],
      },
    });
  }


 
  async removeDirectMsg(userId1: number, userId2: number): Promise<Chanel | null> {
	const chan = await this.prisma.chanel.findFirst({
	  where: {
		OR: [
		  {
			owner_id: userId1,
			interlocutor_id: userId2,
		  },
		  {
			owner_id: userId2,
			interlocutor_id: userId1,
		  },
		],
	  },
	});
	//after creating a bloc table, we suppress the discussion betweenthe both users
	if (chan) {
		await this.prisma.users_Chanels.deleteMany({
			where: {
			  chanel_id: chan.id,
			},
		  });
		return this.prisma.chanel.delete({ where: { id: chan.id } });
	}
	else {
	  return null;
	}
	//now we suppres them of the friend list

  }
  

//   async addBannedUser(channelId: number, userId: number): Promise<Chanel | null> {
//     try {
//       const updatedChannel = await this.prisma.chanel.update({
//         where: { id: channelId },
//         data: {
//           banned_users: {
//             push: userId,
//           },
//         },
//       });

//       return updatedChannel;
//     } catch (error) {
//       console.error('Error adding banned user:', error);
//       return null;
//     }
//   }

}



