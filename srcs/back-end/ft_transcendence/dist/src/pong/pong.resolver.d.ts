import { PongService } from './pong.service';
import { CreatePongInput } from './dto/create-pong.input';
import { UpdatePongInput } from './dto/update-pong.input';
import { PlayerResolver } from './player/player.resolver';
import { BallResolver } from './ball/ball.resolver';
export declare class PongResolver {
    private readonly pongService;
    private readonly player;
    private readonly ball;
    private start;
    private interval;
    private maxX;
    private maxY;
    private minX;
    private minY;
    private speed;
    constructor(pongService: PongService, player: PlayerResolver, ball: BallResolver);
    createPong(createPongInput: CreatePongInput): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId1: number;
        userId2: number;
        scoreUser1: number;
        scoreUser2: number;
        loserId: number;
        winnerId: number;
        versusDate: Date;
    }, unknown> & {}>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<(import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId1: number;
        userId2: number;
        scoreUser1: number;
        scoreUser2: number;
        loserId: number;
        winnerId: number;
        versusDate: Date;
    }, unknown> & {})[]>;
    findUnique(id: number): import(".prisma/client").Prisma.Prisma__PongClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId1: number;
        userId2: number;
        scoreUser1: number;
        scoreUser2: number;
        loserId: number;
        winnerId: number;
        versusDate: Date;
    }, unknown> & {}, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findGame(userId: number): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId1: number;
        userId2: number;
        scoreUser1: number;
        scoreUser2: number;
        loserId: number;
        winnerId: number;
        versusDate: Date;
    }, unknown> & {}>;
    removePong(id: number): string;
    updatePong(updatePongInput: UpdatePongInput): string;
    pongUpdatedSubscription(id: number): AsyncIterator<unknown, any, undefined>;
    stopPong(): boolean;
    startPong(id: number, playerId: number, otherPlayerId: number, pongId: number): Promise<boolean>;
    private ballMove;
}
