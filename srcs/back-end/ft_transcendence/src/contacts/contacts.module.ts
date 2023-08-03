import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsResolver } from './contacts.resolver';
import { PrismaService } from 'prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { ToblocService } from 'src/tobloc/tobloc.service';
@Module({
  providers: [ContactsService, ContactsResolver, PrismaService, UsersService, ToblocService]
})
export class ContactsModule {}
