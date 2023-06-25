import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'prisma/prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createUserInput: CreateUserInput): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: number;
        email: string;
        token: string;
        intra_login: string;
        nickname: string;
        avatar: string;
    } & {}, never, {
        result: {};
        query: {};
        model: {};
        client: {};
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        id: number;
        email: string;
        token: string;
        intra_login: string;
        nickname: string;
        avatar: string;
    } & {})[]>;
    findOneUserById(id: number): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: number;
        email: string;
        token: string;
        intra_login: string;
        nickname: string;
        avatar: string;
    } & {}, never, {
        result: {};
        query: {};
        model: {};
        client: {};
    }>;
    findOneUserByIntraLogin(intra_login: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: number;
        email: string;
        token: string;
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
        email: string;
        token: string;
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
        email: string;
        token: string;
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
