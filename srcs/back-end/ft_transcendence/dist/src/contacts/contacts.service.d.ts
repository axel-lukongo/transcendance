import { PrismaService } from 'prisma/prisma.service';
import { CreateContactInput } from './dto/create-contact.input';
import { UpdateContact } from './dto/update-contact.input';
export declare class ContactsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createContact(createContact: CreateContactInput): import(".prisma/client").Prisma.Prisma__ContactClient<import(".prisma/client").Contact, never>;
    findAllContacts(id: number): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Contact[]>;
    replyAddContact(reply: UpdateContact): import(".prisma/client").Prisma.Prisma__ContactClient<import(".prisma/client").Contact, never>;
}
