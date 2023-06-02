import { ChanelService } from './chanel.service';
import { Chanel } from './entities/chanel.entity';
import { CreateChanelInput } from './dto/create-chanel.input';
import { UpdateChanelInput } from './dto/update-chanel.input';
export declare class ChanelResolver {
    private readonly chanelService;
    constructor(chanelService: ChanelService);
    createChanel(createChanelInput: CreateChanelInput): import(".prisma/client").Prisma.Prisma__ChanelClient<import(".prisma/client").Chanel, never>;
    findAll(): Promise<import(".prisma/client").Chanel[]>;
    findOne(id: number): Promise<import(".prisma/client").Chanel>;
    updateChanel(_updateArgs: UpdateChanelInput): Promise<Chanel>;
    removeChanel(id: number): import(".prisma/client").Prisma.Prisma__ChanelClient<import(".prisma/client").Chanel, never>;
}
