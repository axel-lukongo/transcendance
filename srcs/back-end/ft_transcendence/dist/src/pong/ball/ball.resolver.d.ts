import { BallService } from './ball.service';
import { UpdateBallInput } from './dto/update-ball.input';
export declare class BallResolver {
    private readonly ballService;
    constructor(ballService: BallService);
    createBall(): import(".prisma/client").Prisma.Prisma__BallClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        positionX: number;
        positionY: number;
        directionX: number;
        directionY: number;
    }, unknown> & {}, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<(import("@prisma/client/runtime/library").GetResult<{
        id: number;
        positionX: number;
        positionY: number;
        directionX: number;
        directionY: number;
    }, unknown> & {})[]>;
    findUnique(id: number): import(".prisma/client").Prisma.Prisma__BallClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        positionX: number;
        positionY: number;
        directionX: number;
        directionY: number;
    }, unknown> & {}, null, import("@prisma/client/runtime/library").DefaultArgs>;
    removeBall(id: number): import(".prisma/client").Prisma.Prisma__BallClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        positionX: number;
        positionY: number;
        directionX: number;
        directionY: number;
    }, unknown> & {}, never, import("@prisma/client/runtime/library").DefaultArgs>;
    updateBall(updateBallInput: UpdateBallInput): import(".prisma/client").Prisma.Prisma__BallClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        positionX: number;
        positionY: number;
        directionX: number;
        directionY: number;
    }, unknown> & {}, never, import("@prisma/client/runtime/library").DefaultArgs>;
    ballUpdatedSubscription(id: number): AsyncIterator<unknown, any, undefined>;
}
