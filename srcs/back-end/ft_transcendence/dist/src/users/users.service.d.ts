import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'prisma/prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<(import("@prisma/client/runtime/library").GetResult<{
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
    findUserByToken(token: string): import(".prisma/client").Prisma.Prisma__UserClient<import("@prisma/client/runtime/library").GetResult<{
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
    update(id: number, data: UpdateUserInput): Promise<import("@prisma/client/runtime/library").GetResult<{
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
    remove(id: number): import(".prisma/client").Prisma.Prisma__UserClient<import("@prisma/client/runtime/library").GetResult<{
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
    researchUsers(research: string, user_id: number): import(".prisma/client").Prisma.PrismaPromise<(import("@prisma/client/runtime/library").GetResult<{
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
    researchUsersForAddChanel(user_id: number, chan_id: number): import(".prisma/client").Prisma.PrismaPromise<(import("@prisma/client/runtime/library").GetResult<{
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
}
