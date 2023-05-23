import { CreateMessageDto, UpdateMessageDto } from '../dto/messages.dto';
import { MessagesService } from './messages.service';
export declare class MessagesController {
    private readonly msgServ;
    constructor(msgServ: MessagesService);
    createMessage(messageDto: CreateMessageDto): void;
    getMessage(id: string): Promise<any>;
    updateMessage(id: string, msgDto: UpdateMessageDto): Promise<any>;
    deleteMessage(id: string): Promise<any>;
}
