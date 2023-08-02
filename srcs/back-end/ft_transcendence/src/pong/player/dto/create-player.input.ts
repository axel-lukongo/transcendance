import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreatePlayerInput {

	@Field(() => Int)
	userId: number

	@Field(() => Float)
	positionY: number

	@Field(() => Float)
	positionX: number

	@Field(() => Int)
	waitingRoomId: number
}

