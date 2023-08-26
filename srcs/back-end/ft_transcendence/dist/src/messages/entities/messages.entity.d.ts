import { User } from 'src/users/entities/user.entity';
import { Chanel } from 'src/chanel/entities/chanel.entity';
export declare class Message {
    id: number;
    content: string;
    sent_at: Date;
    sender_id: number;
    sender: User;
    channel_id?: number;
    channel?: Chanel;
<<<<<<< HEAD
=======
    invite_game: boolean;
>>>>>>> origin/axel
}
