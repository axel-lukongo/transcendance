import { ToblocService } from './tobloc.service';
import { ChanelService } from 'src/chanel/chanel.service';
import { ContactsService } from 'src/contacts/contacts.service';
import { UsersService } from 'src/users/users.service';
export declare class ToblocResolver {
    private readonly toblocService;
    private readonly chanelService;
    private readonly contactService;
    private readonly usersService;
    constructor(toblocService: ToblocService, chanelService: ChanelService, contactService: ContactsService, usersService: UsersService);
    createToBloc(blockerId: number, blockedId: number): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        blocker_id: number;
        blocked_id: number;
    }, unknown> & {}>;
    findAll(id: number): Promise<({
        blocked: import("@prisma/client/runtime/library").GetResult<{
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
        }, unknown> & {};
    } & import("@prisma/client/runtime/library").GetResult<{
        id: number;
        blocker_id: number;
        blocked_id: number;
    }, unknown> & {})[]>;
    findOne(id: number): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        blocker_id: number;
        blocked_id: number;
    }, unknown> & {}>;
    UserBlocked(other_userId: number, context: any): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        blocker_id: number;
        blocked_id: number;
    }, unknown> & {}>;
    removeTobloc(id: number): import(".prisma/client").Prisma.Prisma__ToBlocClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        blocker_id: number;
        blocked_id: number;
    }, unknown> & {}, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
