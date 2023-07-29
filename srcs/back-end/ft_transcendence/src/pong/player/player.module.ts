import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerResolver,  } from './player.resolver';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [PlayerResolver, PlayerService, PrismaService]
})
export class PlayerModule {}
