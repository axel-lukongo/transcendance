import { User } from '../entities/user.entity';
declare const UpdateUserInput_base: import("@nestjs/common").Type<Partial<User>>;
export declare class UpdateUserInput extends UpdateUserInput_base {
    id: number;
    token?: string;
    state?: number;
    connection_status?: number;
    tfa_code?: string;
    email?: string;
    nickname?: string;
    avatar?: string;
    level?: number;
    rank?: string;
}
export {};
