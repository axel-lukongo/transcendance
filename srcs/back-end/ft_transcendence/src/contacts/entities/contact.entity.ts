import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class Contact {
	@Field(() => Int)
	id: number;

	@Field(() => Int)
	user_id: number;

	@Field(() => Int)
	contact_id: number;

	@Field(() => Boolean)
	pending: boolean;
}