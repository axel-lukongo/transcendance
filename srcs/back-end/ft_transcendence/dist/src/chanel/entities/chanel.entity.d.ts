import { User } from 'src/users/entities/user.entity';
export declare class Chanel {
    id: number;
    owner_id: number;
    chanel_name: string;
    chanel_size: number;
    max_users: number;
    logo: string;
    private: boolean;
    interlocutor_id: number;
    directMsg?: boolean;
    interlocutor?: User;
}
