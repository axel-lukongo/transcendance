import { UsersService } from './users.service';
import { UpdateUserInput } from './dto/update-user.input';
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAllUsers(context: any): import(".prisma/client").Prisma.PrismaPromise<(import("@prisma/client/runtime/library").GetResult<{
        id: number;
        token: string;
        state: number;
        tfa_code: string;
        email: string;
        intra_login: string;
        nickname: string;
        avatar: string;
        rank: string;
        level: number;
    }, unknown> & {})[]>;
    findUserById(id: number): import(".prisma/client").Prisma.Prisma__UserClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        token: string;
        state: number;
        tfa_code: string;
        email: string;
        intra_login: string;
        nickname: string;
        avatar: string;
        rank: string;
        level: number;
    }, unknown> & {}, null, import("@prisma/client/runtime/library").DefaultArgs>;
    updateUser(updateUserInput: UpdateUserInput): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        token: string;
        state: number;
        tfa_code: string;
        email: string;
        intra_login: string;
        nickname: string;
        avatar: string;
        rank: string;
        level: number;
    }, unknown> & {}>;
    removeUser(id: number): import(".prisma/client").Prisma.Prisma__UserClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        token: string;
        state: number;
        tfa_code: string;
        email: string;
        intra_login: string;
        nickname: string;
        avatar: string;
        rank: string;
        level: number;
    }, unknown> & {}, never, import("@prisma/client/runtime/library").DefaultArgs>;
    searchUsers(research: string, user_id: number): import(".prisma/client").Prisma.PrismaPromise<(import("@prisma/client/runtime/library").GetResult<{
        id: number;
        token: string;
        state: number;
        tfa_code: string;
        email: string;
        intra_login: string;
        nickname: string;
        avatar: string;
        rank: string;
        level: number;
    }, unknown> & {})[]>;
    searchUserForChanel(user_id: number, chanel_id: number): import(".prisma/client").Prisma.PrismaPromise<(import("@prisma/client/runtime/library").GetResult<{
        id: number;
        token: string;
        state: number;
        tfa_code: string;
        email: string;
        intra_login: string;
        nickname: string;
        avatar: string;
        rank: string;
        level: number;
    }, unknown> & {})[]>;
}
