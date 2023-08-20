import { Module } from '@nestjs/common';
import { ToblocService } from './tobloc.service';
import { ToblocResolver } from './tobloc.resolver';
import { PrismaService } from 'prisma/prisma.service';
import { ChanelService } from 'src/chanel/chanel.service';
import { UsersService } from 'src/users/users.service';
import { ContactsService } from 'src/contacts/contacts.service';
@Module({
  providers: [ToblocResolver, ToblocService, PrismaService, ChanelService, UsersService, ContactsService]
})
export class ToblocModule {}
