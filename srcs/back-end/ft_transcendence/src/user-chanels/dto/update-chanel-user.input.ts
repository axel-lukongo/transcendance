import { Field, PartialType, InputType, Int } from '@nestjs/graphql'
import { AddUserChanel } from './add-user-chanel.input'

@InputType()
export class UpdateChanelUserInput extends PartialType(AddUserChanel) {
	@Field(() => Int)
	user_id: number;

	@Field(() => Int)
	chanel_id: number;

	@Field(() => Boolean)
	is_muted: boolean;

	@Field(() => Boolean)
	is_admin: boolean;

	@Field(() =>  Int)
	mute_start_time?: number;
}