import { User } from 'src/users/entities/user.entity';
export declare class Pong {
    id: number;
    userId1: number;
    userId2: number;
    scoreUser1: number;
    scoreUser2: number;
    loserId: number;
    winnerId: number;
    versusDate: Date;
    start: boolean;
    user1?: User;
    user2?: User;
}
