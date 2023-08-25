import { Player } from '../entities/player.entity';
declare const UpdatePlayerInput_base: import("@nestjs/common").Type<Partial<Player>>;
export declare class UpdatePlayerInput extends UpdatePlayerInput_base {
    id: number;
    userId?: number;
    positionX?: number;
    positionY?: number;
    host?: boolean;
    waitingRoomId?: number;
    opponentPlayerId?: number;
    ballId?: number;
    pongId?: number;
}
export {};
