import { Module } from '@nestjs/common';
import { BallService } from './ball.service';
import { BallResolver } from './ball.resolver';
import { PrismaService } from 'prisma/prisma.service';
import { PlayerResolver } from '../player/player.resolver';
import { PlayerService } from '../player/player.service';
import { PongResolver } from '../pong.resolver';
import { PongService } from '../pong.service';

@Module({
  providers: [BallResolver, BallService, PrismaService]
})
export class BallModule {}
