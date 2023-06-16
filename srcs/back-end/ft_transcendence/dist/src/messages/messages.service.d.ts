import { PrismaService } from 'prisma/prisma.service';
import { CreateMessageInput } from './dto/create-messages.input';
import { UpdateMessageInput } from './dto/update-message.input';
export declare class MessagesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll_msg(): Promise<import(".prisma/client").Message[]>;
    findOne_msg(id: number): Promise<import(".prisma/client").Message>;
    create(createMsg: CreateMessageInput): import(".prisma/client").Prisma.Prisma__MessageClient<import(".prisma/client").Message, never>;
    update(id: number, updateMsg: UpdateMessageInput): import(".prisma/client").Prisma.Prisma__MessageClient<import(".prisma/client").Message, never>;
    delete(id: number): import(".prisma/client").Prisma.Prisma__MessageClient<import(".prisma/client").Message, never>;
}
