import { UsersService } from './users.service';
import { UpdateUserInput } from './dto/update-user.input';
export declare const CHANGE_STATE = "changeState";
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAllUsers(context: any): import(".prisma/client").Prisma.PrismaPromise<(import("@prisma/client/runtime/library").GetResult<{
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
    }, unknown> & {})[]>;
    findUserById(id: number): import(".prisma/client").Prisma.Prisma__UserClient<import("@prisma/client/runtime/library").GetResult<{
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
    updateUser(updateUserInput: UpdateUserInput): Promise<import("@prisma/client/runtime/library").GetResult<{
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
    }, unknown> & {}>;
    removeUser(id: number): import(".prisma/client").Prisma.Prisma__UserClient<import("@prisma/client/runtime/library").GetResult<{
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
    }, unknown> & {}, never, import("@prisma/client/runtime/library").DefaultArgs>;
    searchUsers(research: string, context: any): import(".prisma/client").Prisma.PrismaPromise<(import("@prisma/client/runtime/library").GetResult<{
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
    }, unknown> & {})[]>;
    searchUserForChanel(chanel_id: number, context: any): import(".prisma/client").Prisma.PrismaPromise<(import("@prisma/client/runtime/library").GetResult<{
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
    }, unknown> & {})[]>;
    updateState(new_state: number, context: any): Promise<import("@prisma/client/runtime/library").GetResult<{
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
    }, unknown> & {}>;
}
