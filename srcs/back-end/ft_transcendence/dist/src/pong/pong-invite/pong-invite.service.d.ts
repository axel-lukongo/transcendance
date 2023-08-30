import { CreatePongInviteInput } from './dto/create-pong-invite.input';
import { PrismaService } from 'prisma/prisma.service';
export declare class PongInviteService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    setPongInvite(userId: number, friendId: number): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId1: number;
        userId2: number;
        waitingRoomId: number;
    }, unknown> & {}>;
    create(createPongInviteInput: CreatePongInviteInput): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId1: number;
        userId2: number;
        waitingRoomId: number;
    }, unknown> & {}>;
    findPongInvite(userId: number, friendId: number): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId1: number;
        userId2: number;
        waitingRoomId: number;
    }, unknown> & {}>;
    findPongInviteByWaitingRoomId(waitingRoomId: number): import(".prisma/client").Prisma.Prisma__PongInviteClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId1: number;
        userId2: number;
        waitingRoomId: number;
    }, unknown> & {}, null, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__PongInviteClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId1: number;
        userId2: number;
        waitingRoomId: number;
    }, unknown> & {}, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
