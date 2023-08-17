import { PlayerService } from './player.service';
import { CreatePlayerInput } from './dto/create-player.input';
import { UpdatePlayerInput } from './dto/update-player.input';
export declare class PlayerResolver {
    private readonly playerService;
    constructor(playerService: PlayerService);
    findAllPlayers(): import(".prisma/client").Prisma.PrismaPromise<(import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId: number;
        positionX: number;
        positionY: number;
        host: boolean;
        opponentPlayerId: number;
        waitingRoomId: number;
        pongId: number;
        ballId: number;
    }, unknown> & {})[]>;
    findPlayer(id: number): import(".prisma/client").Prisma.Prisma__PlayerClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId: number;
        positionX: number;
        positionY: number;
        host: boolean;
        opponentPlayerId: number;
        waitingRoomId: number;
        pongId: number;
        ballId: number;
    }, unknown> & {}, null, import("@prisma/client/runtime/library").DefaultArgs>;
    removePlayer(id: number): import(".prisma/client").Prisma.Prisma__PlayerClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId: number;
        positionX: number;
        positionY: number;
        host: boolean;
        opponentPlayerId: number;
        waitingRoomId: number;
        pongId: number;
        ballId: number;
    }, unknown> & {}, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findWaitingRoomPlayer(id: number): Promise<(import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId: number;
        positionX: number;
        positionY: number;
        host: boolean;
        opponentPlayerId: number;
        waitingRoomId: number;
        pongId: number;
        ballId: number;
    }, unknown> & {})[]>;
    createPlayer(createPlayerInput: CreatePlayerInput): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId: number;
        positionX: number;
        positionY: number;
        host: boolean;
        opponentPlayerId: number;
        waitingRoomId: number;
        pongId: number;
        ballId: number;
    }, unknown> & {}>;
    listPlayerSubscription(): AsyncIterator<unknown, any, undefined>;
    updatePlayer(updatePlayerInput: UpdatePlayerInput): import(".prisma/client").Prisma.Prisma__PlayerClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId: number;
        positionX: number;
        positionY: number;
        host: boolean;
        opponentPlayerId: number;
        waitingRoomId: number;
        pongId: number;
        ballId: number;
    }, unknown> & {}, never, import("@prisma/client/runtime/library").DefaultArgs>;
    playerUpdatedSubscription(id: number): AsyncIterator<unknown, any, undefined>;
}
