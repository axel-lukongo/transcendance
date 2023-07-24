import { Module } from '@nestjs/common';
import { WaitingRoomService } from './waiting-room.service';
import { WaitingRoomResolver } from './waiting-room.resolver';
import { PrismaService } from 'prisma/prisma.service';
import { PlayerResolver } from '../player/player.resolver';
import { PlayerService } from '../player/player.service';

@Module({
  providers: [WaitingRoomResolver, PlayerResolver, PlayerService, WaitingRoomService, PrismaService]
})
export class WaitingRoomModule {}
