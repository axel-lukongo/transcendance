import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreatePositionPlayerInput {
  @Field(() => Int)
  playerId: number;

  @Field(() => Float)
  positionX:number

  @Field(() => Float)
  positionY:number
}


@InputType()
export class CreatePositionBallInput {
	@Field(() => Int)
	id: number;

	@Field(() => Int)
	PongId: number;

	@Field(() => Float)
	positionX: number

	@Field(() => Float)
	positionY: number

	@Field(() => Float)
	velocityX: number
	
	@Field(() => Float)
	velocityY: number
}
