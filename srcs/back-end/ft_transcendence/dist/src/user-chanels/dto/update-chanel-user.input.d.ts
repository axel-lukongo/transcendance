import { AddUserChanel } from './add-user-chanel.input';
declare const UpdateChanelUserInput_base: import("@nestjs/common").Type<Partial<AddUserChanel>>;
export declare class UpdateChanelUserInput extends UpdateChanelUserInput_base {
    user_id: number;
    chanel_id: number;
    is_muted: boolean;
    is_admin: boolean;
    mute_start_time?: number;
}
export {};
