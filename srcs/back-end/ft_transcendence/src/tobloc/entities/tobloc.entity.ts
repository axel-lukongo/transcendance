import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Tobloc {
	@Field(() => Int)
	id: number;
    @Field(() => Int)
  	blocker_id: number;
  	@Field(() => Int)
  	blocked_id: number;
}
