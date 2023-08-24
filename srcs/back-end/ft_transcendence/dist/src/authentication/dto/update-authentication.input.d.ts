import { User } from 'src/users/entities/user.entity';
declare const UpdateAuthenticationInput_base: import("@nestjs/common").Type<Partial<User>>;
export declare class UpdateAuthenticationInput extends UpdateAuthenticationInput_base {
    nickname: string;
    avatar: string;
}
export {};
