import { Module } from '@nestjs/common';
import { ChanelService } from './chanel.service';
import { ChanelResolver } from './chanel.resolver';
import { PrismaService } from 'prisma/prisma.service';

@Module({
    providers: [ChanelResolver, ChanelService, PrismaService]
})
export class ChanelModule {}
