import { MessagesService } from './messages.service';
import { CreateMessageInput } from './dto/create-messages.input';
import { UpdateMessageInput } from './dto/update-message.input';
export declare class MessagesResolver {
    private readonly msgService;
    constructor(msgService: MessagesService);
    createMessage(createMsgInput: CreateMessageInput): import(".prisma/client").Prisma.Prisma__MessageClient<import(".prisma/client").Message, never>;
    updateMessage(MsgInput: UpdateMessageInput): import(".prisma/client").Prisma.Prisma__MessageClient<import(".prisma/client").Message, never>;
    deleteMessage(id: number): import(".prisma/client").Prisma.Prisma__MessageClient<import(".prisma/client").Message, never>;
}
