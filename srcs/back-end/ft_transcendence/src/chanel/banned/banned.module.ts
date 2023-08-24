import { Module } from '@nestjs/common';
import { BannedService } from './banned.service';
import { BannedResolver } from './banned.resolver';
import { PrismaService } from 'prisma/prisma.service';
import { UserChanelsService } from 'src/user-chanels/user-chanels.service';

@Module({
  providers: [BannedResolver, BannedService, PrismaService, UserChanelsService]
})
export class BannedModule {}
