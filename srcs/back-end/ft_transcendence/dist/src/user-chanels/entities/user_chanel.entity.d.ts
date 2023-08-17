import { User } from 'src/users/entities/user.entity';
export declare class UsersChanels {
    user_id: number;
    chanel_id: number;
    pending: boolean;
    is_muted: boolean;
    is_admin: boolean;
    user: User;
}
