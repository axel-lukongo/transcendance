import { PrismaService } from 'prisma/prisma.service';
import { CreateUserInput } from 'src/users/dto/create-user.input';
export declare const __CREATING__ = -2;
export declare const __NEED_TFA__ = -1;
export declare const __ACCESS__ = 1;
export declare const __CONNECTED__ = 1;
export declare const __AFK__ = 2;
export declare const __DISCONNECTED__ = 3;
export declare const __IN_GAME__ = 4;
export declare class AuthenticationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createUserInput: CreateUserInput): Promise<import("@prisma/client/runtime/library").GetResult<{
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
    findUserByEmail(email: string): Promise<import("@prisma/client/runtime/library").GetResult<{
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
