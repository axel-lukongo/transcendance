import { Injectable } from '@nestjs/common';
import { CreateBannedInput } from './dto/create-banned.input';
import { UpdateBannedInput } from './dto/update-banned.input';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class BannedService {
	constructor(private readonly prisma: PrismaService) {}


  create(createBannedInput: CreateBannedInput) {
    return this.prisma.user_banned.create({data: createBannedInput})
  }

  async findAll( channelId: number) {
    return this.prisma.user_banned.findMany({
		where: {
			// user_id: userId,
			channel_id: channelId
		},
		include: {user_ban: true}
	});
  }

//   findOne(id: number) {
//     return `This action returns a #${id} banned`;
//   }

//   update(id: number, updateBannedInput: UpdateBannedInput) {
//     return `This action updates a #${id} banned`;
//   }

remove(userId: number, channelId: number) {
  return this.prisma.user_banned.deleteMany({
    where: {
      user_id: userId,
      channel_id: channelId
    }
  });
}

// async UserBanInChannel(userId: number, channelId: number): Promise<boolean>{
// 	const userChannel = await this.prisma.user_banned.findFirst({
// 	  where: {
// 		user_id: userId,
// 		channel_id: channelId,
// 	  },
// 	});

// 	if(userChannel)
// 		return true;
// 	else
// 		return false;

// }


}
