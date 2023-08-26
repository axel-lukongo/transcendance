import { User } from 'src/users/entities/user.entity';
export declare class Banned {
    id: number;
    user_id: number;
    channel_id: number;
    user_ban?: User;
}
