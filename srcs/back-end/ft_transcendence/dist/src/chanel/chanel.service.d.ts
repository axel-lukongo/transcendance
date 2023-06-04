import { CreateChanelInput } from './dto/create-chanel.input';
import { UpdateChanelInput } from './dto/update-chanel.input';
import { PrismaService } from 'prisma/prisma.service';
import { Chanel } from './entities/chanel.entity';
export declare class ChanelService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createChanelInput: CreateChanelInput): Promise<import(".prisma/client").Chanel>;
    findAll(): Promise<Chanel[]>;
    findOne(id: number): Promise<Chanel>;
    update(id: number, data: UpdateChanelInput): Promise<Chanel>;
    remove(id: number): Promise<import(".prisma/client").Chanel>;
}
