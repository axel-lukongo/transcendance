import { CreatePongInput } from './create-pong.input';
declare const UpdatePongInput_base: import("@nestjs/common").Type<Partial<CreatePongInput>>;
export declare class UpdatePongInput extends UpdatePongInput_base {
    id: number;
    scoreUser1?: number;
    scoreUser2?: number;
    loserId?: number;
    winnerId?: number;
    start?: boolean;
}
export {};
