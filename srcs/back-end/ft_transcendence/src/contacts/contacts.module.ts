import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsResolver } from './contacts.resolver';
import { PrismaService } from 'prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Module({
  providers: [ContactsService, ContactsResolver, PrismaService, UsersService]
})
export class ContactsModule {}
