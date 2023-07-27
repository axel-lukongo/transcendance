import { Module } from '@nestjs/common';
import { PongService } from './pong.service';
import { PongResolver } from './pong.resolver';
import { PlayerModule } from './player/player.module';
import { PrismaService } from 'prisma/prisma.service';
import { WaitingRoomModule } from './waiting-room/waiting-room.module';
import { PlayerService } from './player/player.service';
import { PlayerResolver } from './player/player.resolver';

@Module({
  providers: [PongResolver, PongService, PlayerResolver, PlayerService, PrismaService],
  imports: [PlayerModule, WaitingRoomModule]
})
export class PongModule {}
