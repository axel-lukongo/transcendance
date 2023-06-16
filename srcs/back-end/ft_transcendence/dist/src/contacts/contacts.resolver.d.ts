import { Contact } from './entities/contact.entity';
import { ContactsService } from './contacts.service';
import { CreateContactInput } from './dto/create-contact.input';
import { UsersService } from 'src/users/users.service';
export declare class ContactsResolver {
    private readonly myService;
    private readonly userService;
    constructor(myService: ContactsService, userService: UsersService);
    createContact(createContact: CreateContactInput): import(".prisma/client").Prisma.Prisma__ContactClient<import(".prisma/client").Contact, never>;
    findAllContacts(id: number): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Contact[]>;
    findContact(contact: Contact): import(".prisma/client").Prisma.Prisma__UserClient<import(".prisma/client").User, never>;
}
