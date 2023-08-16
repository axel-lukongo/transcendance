import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreatePlayerInput {

	@Field(() => Int)
	userId: number

	@Field(() => Int)
	waitingRoomId: number
}

