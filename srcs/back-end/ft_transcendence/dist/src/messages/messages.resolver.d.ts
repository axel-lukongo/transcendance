import { MessagesService } from './messages.service';
import { CreateMessageInput } from './dto/create-messages.input';
import { UpdateMessageInput } from './dto/update-message.input';
export declare class MessagesResolver {
    private readonly msgService;
    constructor(msgService: MessagesService);
    findAll_msg(): Promise<({
        id: number;
        content: string;
        sent_at: Date;
        sender_id: number;
        channel_id: number;
    } & {})[]>;
    findOne_msg(id: number): Promise<{
        id: number;
        content: string;
        sent_at: Date;
        sender_id: number;
        channel_id: number;
    } & {}>;
    createMessage(createMsgInput: CreateMessageInput): import(".prisma/client").Prisma.Prisma__MessageClient<{
        id: number;
        content: string;
        sent_at: Date;
        sender_id: number;
        channel_id: number;
    } & {}, never, {
        result: {};
        query: {};
        model: {};
        client: {};
    }>;
    updateMessage(MsgInput: UpdateMessageInput): import(".prisma/client").Prisma.Prisma__MessageClient<{
        id: number;
        content: string;
        sent_at: Date;
        sender_id: number;
        channel_id: number;
    } & {}, never, {
        result: {};
        query: {};
        model: {};
        client: {};
    }>;
    deleteMessage(id: number): import(".prisma/client").Prisma.Prisma__MessageClient<{
        id: number;
        content: string;
        sent_at: Date;
        sender_id: number;
        channel_id: number;
    } & {}, never, {
        result: {};
        query: {};
        model: {};
        client: {};
    }>;
    addmessage(): AsyncIterator<unknown, any, undefined>;
}
