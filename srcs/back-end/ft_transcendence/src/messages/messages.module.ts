import { Module } from '@nestjs/common';
import { MessagesResolver } from './messages.resolver';
import { MessagesService } from './messages.service';
import { PrismaService } from 'prisma/prisma.service';
import { ToblocModule } from './tobloc/tobloc.module';

@Module({
	imports: [ToblocModule],
	providers: [MessagesService, MessagesResolver, PrismaService]
})
export class MessagesModule {}
