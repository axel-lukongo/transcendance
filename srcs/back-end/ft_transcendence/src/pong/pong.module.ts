import { Module } from '@nestjs/common';
import { PongService } from './pong.service';
import { PongResolver, TimerService } from './pong.resolver';
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
import { UsersResolver } from 'src/users/users.resolver';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { PongInviteResolver } from './pong-invite/pong-invite.resolver';
import { PongInviteService } from './pong-invite/pong-invite.service';

@Module({
  providers: [PongResolver, 
              PongService,
              PlayerResolver,
              PlayerService,
              WaitingRoomResolver,
              WaitingRoomService,
              BallResolver,
              BallService,
              UsersResolver,
              UsersService,
              TimerService,
              PongInviteResolver,
              PongInviteService,
              PrismaService],
  
  imports: [PlayerModule, WaitingRoomModule, UsersModule, BallModule]
})
export class PongModule {}
