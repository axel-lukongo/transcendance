import { Ball } from '../entities/ball.entity';
import { InputType, Field, Int, PartialType, Float } from '@nestjs/graphql';

@InputType()
export class UpdateBallInput extends PartialType(Ball) {
  @Field(() => Int)
  id: number;

  @Field(() => Float)
  positionX?: number;

  @Field(() => Float)
  positionY?: number;

  @Field(() => Float)
  directionX?: number;

  @Field(() => Float)
  directionY?: number;
}
