import { PrismaService } from 'prisma/prisma.service';
import { CreateMessageInput } from './dto/create-messages.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { ToblocService } from './tobloc/tobloc.service';
export declare class MessagesService {
    private readonly prisma;
    private readonly blocked;
    constructor(prisma: PrismaService, blocked: ToblocService);
    findAll_msg(): Promise<(import("@prisma/client/runtime/library").GetResult<{
        id: number;
        sender_id: number;
        channel_id: number;
        invite_game: boolean;
        content: string;
        sent_at: Date;
    }, unknown> & {})[]>;
    findOne_msg(id: number): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        sender_id: number;
        channel_id: number;
        invite_game: boolean;
        content: string;
        sent_at: Date;
    }, unknown> & {}>;
    findAll_msg_chan(channelId: number, my_id: number): Promise<any[]>;
    create(createMsg: CreateMessageInput): import(".prisma/client").Prisma.Prisma__MessageClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        sender_id: number;
        channel_id: number;
        invite_game: boolean;
        content: string;
        sent_at: Date;
    }, unknown> & {}, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, updateMsg: UpdateMessageInput): import(".prisma/client").Prisma.Prisma__MessageClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        sender_id: number;
        channel_id: number;
        invite_game: boolean;
        content: string;
        sent_at: Date;
    }, unknown> & {}, never, import("@prisma/client/runtime/library").DefaultArgs>;
    delete(id: number): import(".prisma/client").Prisma.Prisma__MessageClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        sender_id: number;
        channel_id: number;
        invite_game: boolean;
        content: string;
        sent_at: Date;
    }, unknown> & {}, never, import("@prisma/client/runtime/library").DefaultArgs>;
    isUserMutedInChannel(userId: number, channelId: number): Promise<boolean>;
}
