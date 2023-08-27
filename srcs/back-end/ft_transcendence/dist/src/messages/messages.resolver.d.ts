import { MessagesService } from './messages.service';
import { CreateMessageInput } from './dto/create-messages.input';
import { UpdateMessageInput } from './dto/update-message.input';
export declare class MessagesResolver {
    private readonly msgService;
    constructor(msgService: MessagesService);
    findAll_msg(): Promise<(import("@prisma/client/runtime/library").GetResult<{
        id: number;
        sender_id: number;
        channel_id: number;
        invite_game: boolean;
        content: string;
        sent_at: Date;
    }, unknown> & {})[]>;
    findAll_msg_chan(channelId: number, context: any): Promise<any[]>;
    findOne_msg(id: number): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        sender_id: number;
        channel_id: number;
        invite_game: boolean;
        content: string;
        sent_at: Date;
    }, unknown> & {}>;
    createMessage(createMsgInput: CreateMessageInput, context: any): Promise<(import("@prisma/client/runtime/library").GetResult<{
        id: number;
        sender_id: number;
        channel_id: number;
        invite_game: boolean;
        content: string;
        sent_at: Date;
    }, unknown> & {}) | " you are muted">;
    updateMessage(MsgInput: UpdateMessageInput): import(".prisma/client").Prisma.Prisma__MessageClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        sender_id: number;
        channel_id: number;
        invite_game: boolean;
        content: string;
        sent_at: Date;
    }, unknown> & {}, never, import("@prisma/client/runtime/library").DefaultArgs>;
    deleteMessage(id: number): import(".prisma/client").Prisma.Prisma__MessageClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        sender_id: number;
        channel_id: number;
        invite_game: boolean;
        content: string;
        sent_at: Date;
    }, unknown> & {}, never, import("@prisma/client/runtime/library").DefaultArgs>;
    addmessage(channel_id: number): AsyncIterator<unknown, any, undefined>;
}
