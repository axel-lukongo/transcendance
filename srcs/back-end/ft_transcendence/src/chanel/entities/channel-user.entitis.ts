import { Field, ObjectType, Int } from '@nestjs/graphql'

@ObjectType()
export class ChanelUser {
	@Field(() => Int)
	user_id: number;

	@Field(() => Int)
	chanel_id: number;
}