import { PrismaService } from 'prisma/prisma.service';
import { CreateContactInput } from './dto/create-contact.input';
import { UpdateContact } from './dto/update-contact.input';
import { Contact } from './entities/contact.entity';
export declare class ContactsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createContact(createContact: CreateContactInput): import(".prisma/client").Prisma.Prisma__ContactClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        user_id: number;
        contact_id: number;
        pending: boolean;
    }, unknown> & {}, never, import("@prisma/client/runtime/library").DefaultArgs>;
    delete(contact_id: number): import(".prisma/client").Prisma.Prisma__ContactClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        user_id: number;
        contact_id: number;
        pending: boolean;
    }, unknown> & {}, never, import("@prisma/client/runtime/library").DefaultArgs>;
    deleteContact(user1: number, user2: number): Promise<Contact | null>;
    findContactsRequest(id: number): import(".prisma/client").Prisma.PrismaPromise<(import("@prisma/client/runtime/library").GetResult<{
        id: number;
        user_id: number;
        contact_id: number;
        pending: boolean;
    }, unknown> & {})[]>;
    findMyContactRequest(id: number): import(".prisma/client").Prisma.PrismaPromise<(import("@prisma/client/runtime/library").GetResult<{
        id: number;
        user_id: number;
        contact_id: number;
        pending: boolean;
    }, unknown> & {})[]>;
    replyAddContact(reply: UpdateContact): import(".prisma/client").Prisma.Prisma__ContactClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        user_id: number;
        contact_id: number;
        pending: boolean;
    }, unknown> & {}, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findContacts(user_id: number): import(".prisma/client").Prisma.PrismaPromise<(import("@prisma/client/runtime/library").GetResult<{
        id: number;
        user_id: number;
        contact_id: number;
        pending: boolean;
    }, unknown> & {})[]>;
    checkExist(createContact: CreateContactInput): import(".prisma/client").Prisma.Prisma__ContactClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        user_id: number;
        contact_id: number;
        pending: boolean;
    }, unknown> & {}, null, import("@prisma/client/runtime/library").DefaultArgs>;
}
