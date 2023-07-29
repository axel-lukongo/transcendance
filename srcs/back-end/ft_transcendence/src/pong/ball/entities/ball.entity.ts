import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Ball {

  @Field(() => Int)
  id: number;

  @Field(() => Float)
  positionX: number;

  @Field(() => Float)
  positionY: number;

  @Field(() => Float)
  directionX: number;

  @Field(() => Float)
  directionY: number;
}
