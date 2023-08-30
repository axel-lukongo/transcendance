import { PongService } from './pong.service';
import { Pong } from './entities/pong.entity';
import { CreatePongInput } from './dto/create-pong.input';
import { UpdatePongInput } from './dto/update-pong.input';
import { PlayerResolver } from './player/player.resolver';
import { BallResolver } from './ball/ball.resolver';
import { Ball } from './ball/entities/ball.entity';
import { Player } from './player/entities/player.entity';
import { UsersResolver } from 'src/users/users.resolver';
import { WaitingRoomResolver } from './waiting-room/waiting-room.resolver';
import { PongInviteResolver } from './pong-invite/pong-invite.resolver';
export declare class JoinPongResponse {
    player?: Player;
    otherPlayer?: Player;
    ball?: Ball;
    pong?: Pong;
}
export declare class StatisticMatch {
    grade: number;
    nickname: string;
    level: number;
    rank: string;
    wins: number;
    defeats: number;
    ratio: number;
}
export declare class TimerService {
    private timers;
    startPongTimer(pongId: number, callback: () => void): void;
    stopPongTimer(pongId: number): void;
}
export declare class PongResolver {
    private readonly pongService;
    private readonly player;
    private readonly ball;
    private readonly waitingRoom;
    private readonly user;
    private readonly pongInvite;
    private readonly timer;
    private maxX;
    private maxY;
    private minX;
    private minY;
    private speed;
    constructor(pongService: PongService, player: PlayerResolver, ball: BallResolver, waitingRoom: WaitingRoomResolver, user: UsersResolver, pongInvite: PongInviteResolver, timer: TimerService);
    createPong(createPongInput: CreatePongInput): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId1: number;
        userId2: number;
        scoreUser1: number;
        scoreUser2: number;
        loserId: number;
        winnerId: number;
        versusDate: Date;
        start: boolean;
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
        start: boolean;
    }, unknown> & {})[]>;
    findPong(id: number): import(".prisma/client").Prisma.Prisma__PongClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId1: number;
        userId2: number;
        scoreUser1: number;
        scoreUser2: number;
        loserId: number;
        winnerId: number;
        versusDate: Date;
        start: boolean;
    }, unknown> & {}, null, import("@prisma/client/runtime/library").DefaultArgs>;
    myMatchHistory(context: any): Promise<({
        user1: import("@prisma/client/runtime/library").GetResult<{
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
        user2: import("@prisma/client/runtime/library").GetResult<{
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
        userId1: number;
        userId2: number;
        scoreUser1: number;
        scoreUser2: number;
        loserId: number;
        winnerId: number;
        versusDate: Date;
        start: boolean;
    }, unknown> & {})[]>;
    myMatchStatistic(context: any): Promise<StatisticMatch>;
    leaderBoard(): Promise<StatisticMatch[]>;
    removePong(id: number): string;
    updatePong(updatePongInput: UpdatePongInput): import(".prisma/client").Prisma.Prisma__PongClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        userId1: number;
        userId2: number;
        scoreUser1: number;
        scoreUser2: number;
        loserId: number;
        winnerId: number;
        versusDate: Date;
        start: boolean;
    }, unknown> & {}, never, import("@prisma/client/runtime/library").DefaultArgs>;
    pongUpdatedSubscription(context: any, id: number): AsyncIterator<unknown, any, undefined>;
    private updateRankLevel;
    joinPongInvite(friendId: number, waitingRoomId: number, context: any): Promise<JoinPongResponse | {
        player: import("@prisma/client/runtime/library").GetResult<{
            id: number;
            userId: number;
            positionX: number;
            positionY: number;
            host: boolean;
            opponentPlayerId: number;
            waitingRoomId: number;
            ballId: number;
            pongId: number;
        }, unknown> & {};
        ball: import("@prisma/client/runtime/library").GetResult<{
            id: number;
            positionX: number;
            positionY: number;
            directionX: number;
            directionY: number;
        }, unknown> & {};
        otherPlayer: import("@prisma/client/runtime/library").GetResult<{
            id: number;
            userId: number;
            positionX: number;
            positionY: number;
            host: boolean;
            opponentPlayerId: number;
            waitingRoomId: number;
            ballId: number;
            pongId: number;
        }, unknown> & {};
        pong: import("@prisma/client/runtime/library").GetResult<{
            id: number;
            userId1: number;
            userId2: number;
            scoreUser1: number;
            scoreUser2: number;
            loserId: number;
            winnerId: number;
            versusDate: Date;
            start: boolean;
        }, unknown> & {};
    }>;
    joinPong(userId: number, context: any): Promise<JoinPongResponse | {
        player: import("@prisma/client/runtime/library").GetResult<{
            id: number;
            userId: number;
            positionX: number;
            positionY: number;
            host: boolean;
            opponentPlayerId: number;
            waitingRoomId: number;
            ballId: number;
            pongId: number;
        }, unknown> & {};
        ball: import("@prisma/client/runtime/library").GetResult<{
            id: number;
            positionX: number;
            positionY: number;
            directionX: number;
            directionY: number;
        }, unknown> & {};
        otherPlayer: import("@prisma/client/runtime/library").GetResult<{
            id: number;
            userId: number;
            positionX: number;
            positionY: number;
            host: boolean;
            opponentPlayerId: number;
            waitingRoomId: number;
            ballId: number;
            pongId: number;
        }, unknown> & {};
        pong: import("@prisma/client/runtime/library").GetResult<{
            id: number;
            userId1: number;
            userId2: number;
            scoreUser1: number;
            scoreUser2: number;
            loserId: number;
            winnerId: number;
            versusDate: Date;
            start: boolean;
        }, unknown> & {};
    }>;
    endPong(userId: number, context: any): Promise<string>;
    startPong(ballId: number, playerId: number, otherPlayerId: number, pongId: number): Promise<boolean>;
    private ballMove;
}
