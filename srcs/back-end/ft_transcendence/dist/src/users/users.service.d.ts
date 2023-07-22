import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'prisma/prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<(import("@prisma/client/runtime").GetResult<{
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
    findUserByToken(token: string): import(".prisma/client").Prisma.Prisma__UserClient<import("@prisma/client/runtime").GetResult<{
        id: number;
        token: string;
        is_connecting: boolean;
        tfa_code: string;
        email: string;
        intra_login: string;
        nickname: string;
        avatar: string;
    }, unknown> & {}, never, import("@prisma/client/runtime").DefaultArgs>;
    update(id: number, data: UpdateUserInput): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        token: string;
        is_connecting: boolean;
        tfa_code: string;
        email: string;
        intra_login: string;
        nickname: string;
        avatar: string;
    }, unknown> & {}>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__UserClient<import("@prisma/client/runtime").GetResult<{
        id: number;
        token: string;
        is_connecting: boolean;
        tfa_code: string;
        email: string;
        intra_login: string;
        nickname: string;
        avatar: string;
    }, unknown> & {}, never, import("@prisma/client/runtime").DefaultArgs>;
    researchUsers(research: string, user_id: number): import(".prisma/client").Prisma.PrismaPromise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        token: string;
        is_connecting: boolean;
        tfa_code: string;
        email: string;
        intra_login: string;
        nickname: string;
        avatar: string;
    }, unknown> & {})[]>;
}
