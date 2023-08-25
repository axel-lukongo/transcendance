import { PrismaService } from 'prisma/prisma.service';
export declare class WaitingRoomService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(): import(".prisma/client").Prisma.Prisma__WaitingRoomClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
    }, unknown> & {}, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<(import("@prisma/client/runtime/library").GetResult<{
        id: number;
    }, unknown> & {})[]>;
    findUnique(id: number): import(".prisma/client").Prisma.Prisma__WaitingRoomClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
    }, unknown> & {}, null, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: number): string;
}
