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

	@Field(() => Boolean)
	host: boolean

	@Field(() => Int)
	waitingRoomId: number

	@Field(() => Int)
	opponentPlayerId?: number

	@Field({ nullable: true })
	ballId?: number

	@Field({ nullable: true })
	pongId?: number
}
