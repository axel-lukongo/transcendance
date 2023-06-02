import { CreateChanelInput } from './dto/create-chanel.input';
import { PrismaClient, Chanel } from '@prisma/client';
export declare class ChanelService {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    create(createChanelInput: CreateChanelInput): import(".prisma/client").Prisma.Prisma__ChanelClient<Chanel, never>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<Chanel[]>;
    findOne(id: number): Promise<Chanel>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__ChanelClient<Chanel, never>;
}
