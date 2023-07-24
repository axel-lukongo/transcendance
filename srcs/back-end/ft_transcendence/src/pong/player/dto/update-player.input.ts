import { WaitingRoom } from 'src/pong/waiting-room/entities/waiting-room.entity';
import { Player } from '../entities/player.entity';
import { CreatePositionBallInput } from './create-player.input';
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
	waitingRoomId: number
}


@InputType()
export class UpdatePositionBallInput extends PartialType(CreatePositionBallInput) {

	@Field(() => Int)
	id: number;

	@Field(() => Float)
	positionX?: number

	@Field(() => Float)
	positionY?: number

	@Field(() => Float)
	velocityX?: number
	
	@Field(() => Float)
	velocityY?: number
}
