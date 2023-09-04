import { User } from 'src/users/entities/user.entity';
export declare class Chanel {
    id: number;
    owner_id: number;
    chanel_name: string;
    logo: string;
    private: boolean;
    owner?: User;
    interlocutor_id: number;
    directMsg?: boolean;
    interlocutor?: User;
    interlocutor_avatar?: string;
    interlocutor_name?: string;
}
