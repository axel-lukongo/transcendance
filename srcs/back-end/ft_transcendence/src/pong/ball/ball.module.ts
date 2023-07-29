import { Module } from '@nestjs/common';
import { BallService } from './ball.service';
import { BallResolver } from './ball.resolver';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [BallResolver, BallService, PrismaService]
})
export class BallModule {}
