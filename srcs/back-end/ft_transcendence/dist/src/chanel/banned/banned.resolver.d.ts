import { BannedService } from './banned.service';
import { CreateBannedInput } from './dto/create-banned.input';
import { UserChanelsService } from 'src/user-chanels/user-chanels.service';
export declare class BannedResolver {
    private readonly bannedService;
    private readonly userChanelService;
    constructor(bannedService: BannedService, userChanelService: UserChanelsService);
    createBanned(createBannedInput: CreateBannedInput, context: any): Promise<(import("@prisma/client/runtime/library").GetResult<{
        id: number;
        user_id: number;
        channel_id: number;
    }, unknown> & {}) | "action denied">;
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
    removeBanned(userId: number, channelId: number): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Prisma.BatchPayload>;
}
