import { ObjectType, Field, Int, Float} from '@nestjs/graphql';

@ObjectType()
export class Player {

  	@Field(() => Int)
  	id: number;

	@Field(() => Int)
	userId: number

	@Field(() => Float)
	positionX: number
	
	@Field(() => Float)
	positionY: number

	@Field(() => Int)
	waitingRoomId: number

	@Field(() => Int)
	opponentPlayerId: number
}



@ObjectType()
export class PositionBall {
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
