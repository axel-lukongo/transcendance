import { Module } from '@nestjs/common';
import { WaitingRoomService } from './waiting-room.service';
import { WaitingRoomResolver } from './waiting-room.resolver';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [WaitingRoomResolver, WaitingRoomService, PrismaService]
})
export class WaitingRoomModule {}
