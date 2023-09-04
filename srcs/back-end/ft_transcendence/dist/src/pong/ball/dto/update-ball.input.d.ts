import { Ball } from '../entities/ball.entity';
declare const UpdateBallInput_base: import("@nestjs/common").Type<Partial<Ball>>;
export declare class UpdateBallInput extends UpdateBallInput_base {
    id: number;
    positionX?: number;
    positionY?: number;
    directionX?: number;
    directionY?: number;
}
export {};
