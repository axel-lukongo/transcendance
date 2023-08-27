import { CreatePongInput } from './dto/create-pong.input';
import { UpdatePongInput } from './dto/update-pong.input';
import { PrismaService } from 'prisma/prisma.service';
import { User } from 'src/users/entities/user.entity';
import { StatisticMatch } from './pong.resolver';
interface UserStats {
    wins: number;
    defeats: number;
    ratio: number;
}
export declare class PongService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createPongInput: CreatePongInput): Promise<import("@prisma/client/runtime/library").GetResult<{
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
    findUnique(id: number): import(".prisma/client").Prisma.Prisma__PongClient<import("@prisma/client/runtime/library").GetResult<{
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
    findCurrentGame(userId: number): Promise<import("@prisma/client/runtime/library").GetResult<{
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
    myMatchStatistic(userId: number): Promise<StatisticMatch | null>;
    myMatchHistory(userId: number): Promise<({
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
    calculateStat(user: User): Promise<UserStats>;
    leaderBoard(): Promise<StatisticMatch[]>;
    update(id: number, updatePongInput: UpdatePongInput): import(".prisma/client").Prisma.Prisma__PongClient<import("@prisma/client/runtime/library").GetResult<{
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
    remove(id: number): string;
}
export {};
