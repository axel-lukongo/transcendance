import { Module } from '@nestjs/common';
import { BallService } from './ball.service';
import { BallResolver } from './ball.resolver';
import { PrismaService } from 'prisma/prisma.service';
import { PlayerResolver } from '../player/player.resolver';
import { PlayerService } from '../player/player.service';

@Module({
  providers: [BallResolver, BallService, PlayerResolver, PlayerService, PrismaService]
})
export class BallModule {}
