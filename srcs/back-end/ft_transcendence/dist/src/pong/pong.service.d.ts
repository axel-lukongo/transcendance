import { CreatePongInput } from './dto/create-pong.input';
import { UpdatePongInput } from './dto/update-pong.input';
import { PrismaService } from 'prisma/prisma.service';
import { PlayerResolver } from './player/player.resolver';
import { BallResolver } from './ball/ball.resolver';
import { WaitingRoomResolver } from './waiting-room/waiting-room.resolver';
export declare class PongService {
    private readonly prisma;
    private readonly player;
    private readonly ball;
    private readonly waitingRoom;
    constructor(prisma: PrismaService, player: PlayerResolver, ball: BallResolver, waitingRoom: WaitingRoomResolver);
    create(createPongInput: CreatePongInput): Promise<import("@prisma/client/runtime/library").GetResult<{
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
    update(id: number, updatePongInput: UpdatePongInput): string;
    remove(id: number): string;
}
