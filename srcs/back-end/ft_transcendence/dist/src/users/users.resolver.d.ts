import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(createUserInput: CreateUserInput): import(".prisma/client").Prisma.Prisma__UserClient<{
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
    updateUser(updateUserInput: UpdateUserInput): import(".prisma/client").Prisma.Prisma__UserClient<{
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
    removeUser(id: number): import(".prisma/client").Prisma.Prisma__UserClient<{
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
