import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class AddUserChanel {
	@Field(() => Int)
	user_id: number;

	@Field(() => Int)
	chanel_id: number;

	@Field(() => Boolean, {nullable: true})
	pending?: boolean;

	@Field(() => Boolean, {nullable: true})
	is_muted?: boolean;

	@Field(() => Boolean, {nullable: true})
	is_admin?: boolean;

	@Field(() => Int)
	mute_start_time?: number;
}