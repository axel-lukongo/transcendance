import { Contact } from './entities/contact.entity';
import { ContactsService } from './contacts.service';
import { CreateContactInput } from './dto/create-contact.input';
import { UsersService } from 'src/users/users.service';
import { UpdateContact } from './dto/update-contact.input';
export declare class ContactsResolver {
    private readonly contactService;
    private readonly userService;
    constructor(contactService: ContactsService, userService: UsersService);
    createContact(createContact: CreateContactInput): import(".prisma/client").Prisma.Prisma__ContactClient<import(".prisma/client").Contact, never>;
    findAllContactsRequest(id: number): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Contact[]>;
    findContact(contact: Contact): import(".prisma/client").Prisma.Prisma__UserClient<import(".prisma/client").User, never>;
    replyInviteContact(reply: UpdateContact): import(".prisma/client").Prisma.Prisma__ContactClient<import(".prisma/client").Contact, never>;
    deleteContact(contact_id: number): import(".prisma/client").Prisma.Prisma__ContactClient<import(".prisma/client").Contact, never>;
}
