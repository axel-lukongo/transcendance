import { User } from 'src/users/entities/user.entity';
export declare class Tobloc {
    id: number;
    blocker_id: number;
    blocked_id: number;
    blocked: User;
}
