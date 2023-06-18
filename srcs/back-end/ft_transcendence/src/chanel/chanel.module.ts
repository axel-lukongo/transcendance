import { Module } from '@nestjs/common';
import { ChanelService } from './chanel.service';
import { ChanelResolver } from './chanel.resolver';
import { PrismaService } from 'prisma/prisma.service';
import { MessagesResolver } from '../messages/messages.resolver';
import { MessagesModule } from '../messages/messages.module'; // Importez votre module MessagesModule
import { MessagesService } from 'src/messages/messages.service';

@Module({
	imports: [MessagesModule], // Ajoutez MessagesModule dans les imports
    providers: [ChanelResolver, ChanelService, PrismaService, MessagesResolver, MessagesService]
})
export class ChanelModule {}
