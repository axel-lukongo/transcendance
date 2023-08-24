import { WaitingRoomService } from './waiting-room.service';
export declare class WaitingRoomResolver {
    private readonly waitingRoomService;
    constructor(waitingRoomService: WaitingRoomService);
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
