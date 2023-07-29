import { Player } from '../entities/player.entity';
import { InputType, Field, Int, PartialType, Float } from '@nestjs/graphql';

@InputType()
export class UpdatePlayerInput extends PartialType(Player) {

	@Field(() => Int)
	id: number;

	@Field(() => Int)
	userId?: number;

	@Field(() => Float)
	positionX?:number

	@Field(() => Float)
	positionY?:number

	@Field(() => Int)
	waitingRoomId?: number

	@Field(() => Int)
	opponentPlayerId?: number

	@Field({ nullable: true })
	BallId?: number
}