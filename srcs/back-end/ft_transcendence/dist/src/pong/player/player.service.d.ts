import { CreatePlayerInput } from './dto/create-player.input';
import { UpdatePlayerInput } from './dto/update-player.input';
import { PrismaService } from 'prisma/prisma.service';
export declare class PlayerService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createPlayerInput: CreatePlayerInput): Promise<import("@prisma/client/runtime/library").GetResult<{
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
    findAll(): import(".prisma/client").Prisma.PrismaPromise<(import("@prisma/client/runtime/library").GetResult<{
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
    findUnique(id: number): import(".prisma/client").Prisma.Prisma__PlayerClient<import("@prisma/client/runtime/library").GetResult<{
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
    update(id: number, updatePlayerInput: UpdatePlayerInput): import(".prisma/client").Prisma.Prisma__PlayerClient<import("@prisma/client/runtime/library").GetResult<{
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
    remove(id: number): import(".prisma/client").Prisma.Prisma__PlayerClient<import("@prisma/client/runtime/library").GetResult<{
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
    findWaitingRoomPlayers(id: number): import(".prisma/client").Prisma.PrismaPromise<(import("@prisma/client/runtime/library").GetResult<{
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
}
