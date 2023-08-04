import { Field, Int } from "@nestjs/graphql";
import { ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UsersChanels {
	@Field(() => Int)
	user_id: number;

	@Field(() => Int)
	chanel_id: number;

	@Field(() => Boolean)
	pending: boolean;

	@Field(() => Boolean)
	is_muted: boolean;

	@Field(() => Boolean)
	is_admin: boolean;
}