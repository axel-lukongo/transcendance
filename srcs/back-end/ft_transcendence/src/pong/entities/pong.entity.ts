import { ObjectType, Field, Int} from '@nestjs/graphql';

@ObjectType()
export class Pong {
	@Field(() => Int)
	id: number;

	@Field(() => Int)
	userId1: number;

  	@Field(() => Int)
	userId2: number;

  	@Field(() => Int)
	scoreUser1: number;

  	@Field(() => Int)
	scoreUser2: number;

 	@Field(() => Int, {nullable: true})
	loserId: number;

 	@Field(() => Int, {nullable: true})
	winnerId: number;

	@Field(() => Date)
	versusDate: Date;
}



