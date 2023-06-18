import { ChanelService } from './chanel.service';
import { Chanel } from './entities/chanel.entity';
import { CreateChanelInput } from './dto/create-chanel.input';
import { UpdateChanelInput } from './dto/update-chanel.input';
import { MessagesResolver } from '../messages/messages.resolver';
export declare class ChanelResolver {
    private readonly chanelService;
    private readonly messagesResolver;
    constructor(chanelService: ChanelService, messagesResolver: MessagesResolver);
    createChanel(createChanelInput: CreateChanelInput): Promise<import(".prisma/client").Chanel>;
    findAll(): Promise<Chanel[]>;
    findOne(id: number): Promise<Chanel>;
    updateChanel(_updateArgs: UpdateChanelInput): Promise<Chanel>;
    removeChanel(id: number): Promise<import(".prisma/client").Chanel>;
    messages(chanel: Chanel): Promise<import(".prisma/client").Message[]>;
}
