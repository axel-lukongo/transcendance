import { Module } from '@nestjs/common';
import { PongService } from './pong.service';
import { PongResolver } from './pong.resolver';
import { PlayerModule } from './player/player.module';
import { PrismaService } from 'prisma/prisma.service';
import { WaitingRoomModule } from './waiting-room/waiting-room.module';
import { PlayerService } from './player/player.service';
import { PlayerResolver } from './player/player.resolver';
import { BallModule } from './ball/ball.module';
import { WaitingRoomResolver } from './waiting-room/waiting-room.resolver';
import { WaitingRoomService } from './waiting-room/waiting-room.service';
import { BallResolver } from './ball/ball.resolver';
import { BallService } from './ball/ball.service';

@Module({
  providers: [PongResolver, 
              PongService,
              PlayerResolver,
              PlayerService,
              WaitingRoomResolver,
              WaitingRoomService,
              BallResolver,
              BallService,
              PrismaService],
  
  imports: [PlayerModule, WaitingRoomModule, BallModule]
})
export class PongModule {}
