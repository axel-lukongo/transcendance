import { Module } from '@nestjs/common';
import { ChanelService } from './chanel.service';
import { ChanelResolver } from './chanel.resolver';
import { PrismaService } from 'prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Module({
    providers: [ChanelResolver, ChanelService, PrismaService, UsersService]
})
export class ChanelModule {}
