import { Contact } from './entities/contact.entity';
import { ContactsService } from './contacts.service';
import { CreateContactInput } from './dto/create-contact.input';
import { UsersService } from 'src/users/users.service';
import { UpdateContact } from './dto/update-contact.input';
import { ToblocService } from 'src/messages/tobloc/tobloc.service';
export declare class ContactsResolver {
    private readonly contactService;
    private readonly userService;
    private readonly toblocService;
    constructor(contactService: ContactsService, userService: UsersService, toblocService: ToblocService);
    createContact(createContact: CreateContactInput): Promise<any>;
    findAllContactsRequest(context: any): import(".prisma/client").Prisma.PrismaPromise<(import("@prisma/client/runtime/library").GetResult<{
        id: number;
        user_id: number;
        contact_id: number;
        pending: boolean;
    }, unknown> & {})[]>;
    findMyContactRequest(context: any): import(".prisma/client").Prisma.PrismaPromise<(import("@prisma/client/runtime/library").GetResult<{
        id: number;
        user_id: number;
        contact_id: number;
        pending: boolean;
    }, unknown> & {})[]>;
    findContact(contact: Contact, context: any): import(".prisma/client").Prisma.Prisma__UserClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        token: string;
        state: number;
        connection_status: number;
        tfa_code: string;
        email: string;
        nickname: string;
        avatar: string;
        rank: string;
        level: number;
    }, unknown> & {}, null, import("@prisma/client/runtime/library").DefaultArgs>;
    replyInviteContact(reply: UpdateContact): import(".prisma/client").Prisma.Prisma__ContactClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        user_id: number;
        contact_id: number;
        pending: boolean;
    }, unknown> & {}, never, import("@prisma/client/runtime/library").DefaultArgs>;
    deletecontact(user1: number, user2: number): Promise<Contact>;
    deleteContact(contact_id: number): import(".prisma/client").Prisma.Prisma__ContactClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        user_id: number;
        contact_id: number;
        pending: boolean;
    }, unknown> & {}, never, import("@prisma/client/runtime/library").DefaultArgs>;
    getMyContacts(context: any): import(".prisma/client").Prisma.PrismaPromise<(import("@prisma/client/runtime/library").GetResult<{
        id: number;
        user_id: number;
        contact_id: number;
        pending: boolean;
    }, unknown> & {})[]>;
    changeState(context: any): AsyncIterator<unknown, any, undefined>;
}
