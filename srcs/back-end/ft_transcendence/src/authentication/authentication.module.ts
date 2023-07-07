import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationResolver } from './authentication.resolver';
import { PrismaService } from 'prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { MailingModule } from './mailing/mailing.module';
import { MailingService } from './mailing/mailing.service';

@Module({
  providers: [AuthenticationResolver, AuthenticationService, UsersService, PrismaService, MailingService],
  imports: [MailingModule]
})
export class AuthenticationModule {}
