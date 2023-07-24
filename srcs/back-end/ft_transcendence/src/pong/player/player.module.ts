import { Module } from '@nestjs/common';
import { PlayerService, PositionBallService } from './player.service';
import { PlayerResolver, PositionBallResolver } from './player.resolver';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [PlayerResolver, PositionBallResolver, PlayerService, PositionBallService, PrismaService]
})
export class PlayerModule {}
