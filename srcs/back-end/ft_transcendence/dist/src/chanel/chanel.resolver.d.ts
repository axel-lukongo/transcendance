import { ChanelService } from './chanel.service';
import { Chanel } from './entities/chanel.entity';
import { CreateChanelInput } from './dto/create-chanel.input';
import { UpdateChanelInput } from './dto/update-chanel.input';
import { MessagesResolver } from '../messages/messages.resolver';
export declare class ChanelResolver {
    private readonly chanelService;
    private readonly messagesResolver;
    constructor(chanelService: ChanelService, messagesResolver: MessagesResolver);
    createChanel(createChanelInput: CreateChanelInput): Promise<{
        id: number;
        owner_id: number;
        chanel_name: string;
        chanel_size: number;
        max_users: number;
        logo: string;
    } & {}>;
    findOne(id: number): Promise<{
        id: number;
        owner_id: number;
        chanel_name: string;
        chanel_size: number;
        max_users: number;
        logo: string;
    } & {}>;
    updateChanel(_updateArgs: UpdateChanelInput): Promise<Chanel>;
    removeChanel(id: number): Promise<{
        id: number;
        owner_id: number;
        chanel_name: string;
        chanel_size: number;
        max_users: number;
        logo: string;
    } & {}>;
    myChanels(user_id: number): Promise<({
        id: number;
        owner_id: number;
        chanel_name: string;
        chanel_size: number;
        max_users: number;
        logo: string;
    } & {})[]>;
    messages(chanel: Chanel): Promise<({
        id: number;
        content: string;
        sent_at: Date;
        sender_id: number;
        channel_id: number;
    } & {})[]>;
}
