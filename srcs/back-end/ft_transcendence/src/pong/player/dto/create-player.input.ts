import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreatePlayerInput {

	@Field(() => Int)
	playerId: number

	@Field(() => Float)
	positionY: number

	@Field(() => Float)
	positionX: number
}


@InputType()
export class CreatePositionBallInput {

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
