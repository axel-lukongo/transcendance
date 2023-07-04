import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationResolver } from './authentication.resolver';
import { PrismaService } from 'prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Module({
  providers: [AuthenticationResolver, AuthenticationService, UsersService,PrismaService]
})
export class AuthenticationModule {}
