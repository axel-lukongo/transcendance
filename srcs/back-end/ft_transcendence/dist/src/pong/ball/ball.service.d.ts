import { UpdateBallInput } from './dto/update-ball.input';
import { PrismaService } from 'prisma/prisma.service';
export declare class BallService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(): import(".prisma/client").Prisma.Prisma__BallClient<import("@prisma/client/runtime/library").GetResult<{
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
    update(id: number, updateBallInput: UpdateBallInput): import(".prisma/client").Prisma.Prisma__BallClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        positionX: number;
        positionY: number;
        directionX: number;
        directionY: number;
    }, unknown> & {}, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__BallClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        positionX: number;
        positionY: number;
        directionX: number;
        directionY: number;
    }, unknown> & {}, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
