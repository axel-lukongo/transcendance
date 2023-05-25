import { Module } from '@nestjs/common';
import { ChanelController } from './chanel.controller';
import { ChanelService } from './chanel.service';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [ChanelController],
  providers: [ChanelService, PrismaClient]
})
export class ChanelModule {}
