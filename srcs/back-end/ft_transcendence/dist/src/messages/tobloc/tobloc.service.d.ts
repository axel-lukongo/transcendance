import { CreateToblocInput } from './dto/create-tobloc.input';
import { PrismaService } from 'prisma/prisma.service';
export declare class ToblocService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(id: number): Promise<({
        blocked: import("@prisma/client/runtime/library").GetResult<{
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
        blocker_id: number;
        blocked_id: number;
    }, unknown> & {})[]>;
    findOne(id: number): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        blocker_id: number;
        blocked_id: number;
    }, unknown> & {}>;
    create(bloc: CreateToblocInput): import(".prisma/client").Prisma.Prisma__ToBlocClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        blocker_id: number;
        blocked_id: number;
    }, unknown> & {}, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__ToBlocClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        blocker_id: number;
        blocked_id: number;
    }, unknown> & {}, never, import("@prisma/client/runtime/library").DefaultArgs>;
    is_blocked(blockerId: number, blockedId: number): Promise<boolean>;
    YourBloc(blockerId: number, blockedId: number): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        blocker_id: number;
        blocked_id: number;
    }, unknown> & {}>;
}
