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
        ballId: number;
        pongId: number;
    }, unknown> & {})[]>;
    findPlayer(id: number): import(".prisma/client").Prisma.Prisma__PlayerClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId: number;
        positionX: number;
        positionY: number;
        host: boolean;
        opponentPlayerId: number;
        waitingRoomId: number;
        ballId: number;
        pongId: number;
    }, unknown> & {}, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findPlayerByUserId(userId: number): import(".prisma/client").Prisma.Prisma__PlayerClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId: number;
        positionX: number;
        positionY: number;
        host: boolean;
        opponentPlayerId: number;
        waitingRoomId: number;
        ballId: number;
        pongId: number;
    }, unknown> & {}, null, import("@prisma/client/runtime/library").DefaultArgs>;
    removePlayer(id: number): import(".prisma/client").Prisma.Prisma__PlayerClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId: number;
        positionX: number;
        positionY: number;
        host: boolean;
        opponentPlayerId: number;
        waitingRoomId: number;
        ballId: number;
        pongId: number;
    }, unknown> & {}, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAllPlayersInWaitingRoom(id: number): Promise<(import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId: number;
        positionX: number;
        positionY: number;
        host: boolean;
        opponentPlayerId: number;
        waitingRoomId: number;
        ballId: number;
        pongId: number;
    }, unknown> & {})[]>;
    createPlayer(createPlayerInput: CreatePlayerInput): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId: number;
        positionX: number;
        positionY: number;
        host: boolean;
        opponentPlayerId: number;
        waitingRoomId: number;
        ballId: number;
        pongId: number;
    }, unknown> & {}>;
    setPlayer(userId: number, room: number): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId: number;
        positionX: number;
        positionY: number;
        host: boolean;
        opponentPlayerId: number;
        waitingRoomId: number;
        ballId: number;
        pongId: number;
    }, unknown> & {}>;
    updatePlayer(updatePlayerInput: UpdatePlayerInput): import(".prisma/client").Prisma.Prisma__PlayerClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId: number;
        positionX: number;
        positionY: number;
        host: boolean;
        opponentPlayerId: number;
        waitingRoomId: number;
        ballId: number;
        pongId: number;
    }, unknown> & {}, never, import("@prisma/client/runtime/library").DefaultArgs>;
    playerUpdatedSubscription(id: number): AsyncIterator<unknown, any, undefined>;
}
