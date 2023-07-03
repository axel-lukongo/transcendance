import { UsersService } from './users.service';
import { UpdateUserInput } from './dto/update-user.input';
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAllUsers(context: any): import(".prisma/client").Prisma.PrismaPromise<({
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
    updateUser(updateUserInput: UpdateUserInput): import(".prisma/client").Prisma.Prisma__UserClient<{
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
    removeUser(id: number): import(".prisma/client").Prisma.Prisma__UserClient<{
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
