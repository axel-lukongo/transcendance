import { PrismaClient } from '@prisma/client';
import { CreateMessageDto, UpdateMessageDto } from '../dto/messages.dto';
export declare class MessagesService {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    createMessage(msgDto: CreateMessageDto): Promise<any>;
    updateMessage(search_id: number, msgDto: UpdateMessageDto): Promise<any>;
    getMessage(search_id: number): Promise<any>;
    deleteMessage(search_id: number): Promise<any>;
}
