import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'prisma/prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        id: number;
        token: string;
        is_connecting: boolean;
        email: string;
        intra_login: string;
        nickname: string;
        avatar: string;
    } & {})[]>;
    findUserById(id: number): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: number;
        token: string;
        is_connecting: boolean;
        email: string;
        intra_login: string;
        nickname: string;
        avatar: string;
    } & {}, never, {
        result: {};
        query: {};
        model: {};
        client: {};
    }>;
    findUserByToken(token: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: number;
        token: string;
        is_connecting: boolean;
        email: string;
        intra_login: string;
        nickname: string;
        avatar: string;
    } & {}, never, {
        result: {};
        query: {};
        model: {};
        client: {};
    }>;
    update(id: number, data: UpdateUserInput): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: number;
        token: string;
        is_connecting: boolean;
        email: string;
        intra_login: string;
        nickname: string;
        avatar: string;
    } & {}, never, {
        result: {};
        query: {};
        model: {};
        client: {};
    }>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: number;
        token: string;
        is_connecting: boolean;
        email: string;
        intra_login: string;
        nickname: string;
        avatar: string;
    } & {}, never, {
        result: {};
        query: {};
        model: {};
        client: {};
    }>;
}
