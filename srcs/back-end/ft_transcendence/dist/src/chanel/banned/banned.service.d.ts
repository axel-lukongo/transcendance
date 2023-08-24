import { CreateBannedInput } from './dto/create-banned.input';
import { PrismaService } from 'prisma/prisma.service';
export declare class BannedService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createBannedInput: CreateBannedInput): import(".prisma/client").Prisma.Prisma__user_bannedClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        user_id: number;
        channel_id: number;
    }, unknown> & {}, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(channelId: number): Promise<({
        user_ban: import("@prisma/client/runtime/library").GetResult<{
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
        }, unknown> & {};
    } & import("@prisma/client/runtime/library").GetResult<{
        id: number;
        user_id: number;
        channel_id: number;
    }, unknown> & {})[]>;
    remove(userId: number, channelId: number): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Prisma.BatchPayload>;
}
