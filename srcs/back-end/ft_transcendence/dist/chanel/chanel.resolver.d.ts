import { ChanelService } from './chanel.service';
import { CreateChanelInput } from './dto/create-chanel.input';
export declare class ChanelResolver {
    private readonly chanelService;
    constructor(chanelService: ChanelService);
    createChanel(createChanelInput: CreateChanelInput): import(".prisma/client").Prisma.Prisma__ChanelClient<import(".prisma/client").Chanel, never>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Chanel[]>;
    findOne(id: number): Promise<import(".prisma/client").Chanel>;
    removeChanel(id: number): import(".prisma/client").Prisma.Prisma__ChanelClient<import(".prisma/client").Chanel, never>;
}
