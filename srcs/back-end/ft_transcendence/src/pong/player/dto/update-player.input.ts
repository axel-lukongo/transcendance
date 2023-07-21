import { CreatePlayerInput } from './create-player.input';
import { CreatePositionBallInput } from './create-player.input';
import { InputType, Field, Int, PartialType, Float } from '@nestjs/graphql';


@InputType()
export class UpdatePlayerInput extends PartialType(CreatePlayerInput) {

	@Field(() => Int)
	id: number;

	@Field(() => Float)
	positionX:number

	@Field(() => Float)
	positionY:number
}


@InputType()
export class UpdatePositionBallInput extends PartialType(CreatePositionBallInput) {

	@Field(() => Int)
	id: number;

	@Field(() => Float)
	positionX: number

	@Field(() => Float)
	positionY: number

	@Field(() => Float)
	velocityX: number
	
	@Field(() => Float)
	velocityY: number
}
