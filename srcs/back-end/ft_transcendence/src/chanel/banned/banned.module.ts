import { Module } from '@nestjs/common';
import { BannedService } from './banned.service';
import { BannedResolver } from './banned.resolver';
import { PrismaService } from 'prisma/prisma.service';


@Module({
  providers: [BannedResolver, BannedService, PrismaService]
})
export class BannedModule {}
