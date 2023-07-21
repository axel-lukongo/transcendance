import { ObjectType, Field, Int, Float} from '@nestjs/graphql';


@ObjectType()
export class PositionPlayer {

  @Field(() => Int)
  id: number;

	@Field(() => Int)
	playerId: number

	@Field(() => Float)
	position_y: number
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
