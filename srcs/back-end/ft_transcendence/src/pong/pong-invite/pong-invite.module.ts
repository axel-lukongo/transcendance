import { Module } from '@nestjs/common';
import { PongInviteService } from './pong-invite.service';
import { PongInviteResolver } from './pong-invite.resolver';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [PongInviteResolver, PongInviteService, PrismaService]
})
export class PongInviteModule {}
