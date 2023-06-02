import { CreateChanelInput } from './dto/create-chanel.input';
import { UpdateChanelInput } from './dto/update-chanel.input';
import { PrismaClient, Chanel } from '@prisma/client';
export declare class ChanelService {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    create(createChanelInput: CreateChanelInput): import(".prisma/client").Prisma.Prisma__ChanelClient<Chanel, never>;
    findAll(): Promise<Chanel[]>;
    findOne(id: number): Promise<Chanel>;
    update(id: number, data: UpdateChanelInput): Promise<Chanel>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__ChanelClient<Chanel, never>;
}
