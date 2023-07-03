import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationResolver } from './authentication.resolver';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [AuthenticationResolver, AuthenticationService, PrismaService]
})
export class AuthenticationModule {}
