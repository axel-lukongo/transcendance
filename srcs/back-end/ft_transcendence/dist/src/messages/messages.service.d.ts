import { PrismaService } from 'prisma/prisma.service';
import { CreateMessageInput } from './dto/create-messages.input';
import { UpdateMessageInput } from './dto/update-message.input';
export declare class MessagesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    create(createMsg: CreateMessageInput): import(".prisma/client").Prisma.Prisma__MessageClient<{
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
    update(id: number, updateMsg: UpdateMessageInput): import(".prisma/client").Prisma.Prisma__MessageClient<{
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
    delete(id: number): import(".prisma/client").Prisma.Prisma__MessageClient<{
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
}
