import { Module } from '@nestjs/common';
import { ChanelService } from './chanel.service';
import { ChanelResolver } from './chanel.resolver';
import { PrismaService } from 'prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { MessagesModule } from 'src/messages/messages.module';
import { MessagesService } from 'src/messages/messages.service';
import { MessagesResolver } from '../messages/messages.resolver';
import { BannedModule } from './banned/banned.module';
@Module({
	imports: [MessagesModule, BannedModule],
    providers: [ChanelResolver, ChanelService, PrismaService, UsersService, MessagesService, MessagesResolver]
})
export class ChanelModule {}
