import { Module } from '@nestjs/common';
import { UserChanelsService } from './user-chanels.service';
import { UserChanelsResolver } from './user-chanels.resolver';
import { PrismaService } from 'prisma/prisma.service';
import { ChanelService } from 'src/chanel/chanel.service';
import { UsersService } from 'src/users/users.service';

@Module({
  providers: [UserChanelsService, UserChanelsResolver, PrismaService, ChanelService, UsersService]
})
export class UserChanelsModule {}
