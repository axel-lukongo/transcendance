import { User } from '../entities/user.entity';
declare const UpdateUserInput_base: import("@nestjs/common").Type<Partial<User>>;
export declare class UpdateUserInput extends UpdateUserInput_base {
    id: number;
    token?: string;
    state?: number;
    is_connecting?: boolean;
    tfa_code?: string;
    email?: string;
    intra_login?: string;
    nickname?: string;
    avatar?: string;
}
export {};
