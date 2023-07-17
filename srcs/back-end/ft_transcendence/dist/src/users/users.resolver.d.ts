import { UsersService } from './users.service';
import { UpdateUserInput } from './dto/update-user.input';
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAllUsers(context: any): import(".prisma/client").Prisma.PrismaPromise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        token: string;
        is_connecting: boolean;
        tfa_code: string;
        email: string;
        intra_login: string;
        nickname: string;
        avatar: string;
    }, unknown> & {})[]>;
    findUserById(id: number): import(".prisma/client").Prisma.Prisma__UserClient<import("@prisma/client/runtime").GetResult<{
        id: number;
        token: string;
        is_connecting: boolean;
        tfa_code: string;
        email: string;
        intra_login: string;
        nickname: string;
        avatar: string;
    }, unknown> & {}, never, import("@prisma/client/runtime").DefaultArgs>;
    updateUser(updateUserInput: UpdateUserInput): import(".prisma/client").Prisma.Prisma__UserClient<import("@prisma/client/runtime").GetResult<{
        id: number;
        token: string;
        is_connecting: boolean;
        tfa_code: string;
        email: string;
        intra_login: string;
        nickname: string;
        avatar: string;
    }, unknown> & {}, never, import("@prisma/client/runtime").DefaultArgs>;
    removeUser(id: number): import(".prisma/client").Prisma.Prisma__UserClient<import("@prisma/client/runtime").GetResult<{
        id: number;
        token: string;
        is_connecting: boolean;
        tfa_code: string;
        email: string;
        intra_login: string;
        nickname: string;
        avatar: string;
    }, unknown> & {}, never, import("@prisma/client/runtime").DefaultArgs>;
}
