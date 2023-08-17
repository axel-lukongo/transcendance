import { WaitingRoomService } from './waiting-room.service';
import { PlayerResolver } from '../player/player.resolver';
export declare class WaitingRoomResolver {
    private readonly waitingRoomService;
    private readonly playerResolver;
    constructor(waitingRoomService: WaitingRoomService, playerResolver: PlayerResolver);
    createWaitingRoom(): import(".prisma/client").Prisma.Prisma__WaitingRoomClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
    }, unknown> & {}, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findWaitingRooms(): import(".prisma/client").Prisma.PrismaPromise<(import("@prisma/client/runtime/library").GetResult<{
        id: number;
    }, unknown> & {})[]>;
    findWaitingRoom(id: number): import(".prisma/client").Prisma.Prisma__WaitingRoomClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
    }, unknown> & {}, null, import("@prisma/client/runtime/library").DefaultArgs>;
    removeWaitingRoom(id: number): string;
}
