import { CreateBannedInput } from './create-banned.input';
declare const UpdateBannedInput_base: import("@nestjs/common").Type<Partial<CreateBannedInput>>;
export declare class UpdateBannedInput extends UpdateBannedInput_base {
    id: number;
    user_id: number;
    channel_id: number;
}
export {};
