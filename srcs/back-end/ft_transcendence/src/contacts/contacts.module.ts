import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsResolver } from './contacts.resolver';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [ContactsService, ContactsResolver, PrismaService]
})
export class ContactsModule {}
