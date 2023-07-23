import { Module } from '@nestjs/common';
import { PongService } from './pong.service';
import { PongResolver } from './pong.resolver';
import { GameModule } from './player/player.module';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [PongResolver, PongService, PrismaService],
  imports: [GameModule]
})
export class PongModule {}
