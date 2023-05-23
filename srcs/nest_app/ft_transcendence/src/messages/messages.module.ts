import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  providers: [MessagesService, PrismaClient],
  controllers: [MessagesController]
})
export class MessagesModule {}
