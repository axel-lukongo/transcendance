import { ChanelService } from './chanel.service';
import { Chanel } from './entities/chanel.entity';
import { CreateChanelInput } from './dto/create-chanel.input';
import { UpdateChanelInput } from './dto/update-chanel.input';
import { MessagesResolver } from '../messages/messages.resolver';
export declare class ChanelResolver {
    private readonly chanelService;
    private readonly messagesResolver;
    constructor(chanelService: ChanelService, messagesResolver: MessagesResolver);
    createChanel(createChanelInput: CreateChanelInput): Promise<Error | (import("@prisma/client/runtime/library").GetResult<{
        id: number;
        owner_id: number;
        chanel_name: string;
        chanel_size: number;
        max_users: number;
        logo: string;
        private: boolean;
        directMsg: boolean;
        interlocutor_id: number;
        interlocutor_avatar: string;
        interlocutor_name: string;
        AdminList: number[];
    }, unknown> & {})>;
    findOne(id: number): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        owner_id: number;
        chanel_name: string;
        chanel_size: number;
        max_users: number;
        logo: string;
        private: boolean;
        directMsg: boolean;
        interlocutor_id: number;
        interlocutor_avatar: string;
        interlocutor_name: string;
        AdminList: number[];
    }, unknown> & {}>;
    updateChanel(_updateArgs: UpdateChanelInput): Promise<Chanel>;
    removeChanel(id: number): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        owner_id: number;
        chanel_name: string;
        chanel_size: number;
        max_users: number;
        logo: string;
        private: boolean;
        directMsg: boolean;
        interlocutor_id: number;
        interlocutor_avatar: string;
        interlocutor_name: string;
        AdminList: number[];
    }, unknown> & {}>;
    myChanels(context: any): Promise<(import("@prisma/client/runtime/library").GetResult<{
        id: number;
        owner_id: number;
        chanel_name: string;
        chanel_size: number;
        max_users: number;
        logo: string;
        private: boolean;
        directMsg: boolean;
        interlocutor_id: number;
        interlocutor_avatar: string;
        interlocutor_name: string;
        AdminList: number[];
    }, unknown> & {})[]>;
    messages(chanel: Chanel): Promise<(import("@prisma/client/runtime/library").GetResult<{
        id: number;
        sender_id: number;
        channel_id: number;
        invite_game: boolean;
        content: string;
        sent_at: Date;
    }, unknown> & {})[]>;
    getChannelByOwnersAndInterlocutor(userId1: number, userId2: number): Promise<Chanel>;
    removeDirectMsg(userId1: number, userId2: number): Promise<Chanel>;
}
