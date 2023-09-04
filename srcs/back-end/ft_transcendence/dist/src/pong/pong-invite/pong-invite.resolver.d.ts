import { PongInviteService } from './pong-invite.service';
export declare class PongInviteResolver {
    private readonly pongInviteService;
    constructor(pongInviteService: PongInviteService);
    setPongInvite(friendId: number, context: any): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId1: number;
        userId2: number;
        waitingRoomId: number;
    }, unknown> & {}>;
    findPongInviteByWaitingRoomId(waitingRoomId: number): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId1: number;
        userId2: number;
        waitingRoomId: number;
    }, unknown> & {}>;
    removePongInvite(id: number): import(".prisma/client").Prisma.Prisma__PongInviteClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId1: number;
        userId2: number;
        waitingRoomId: number;
    }, unknown> & {}, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
