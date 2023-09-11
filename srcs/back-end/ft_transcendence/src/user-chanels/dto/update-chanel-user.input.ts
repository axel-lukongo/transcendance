import { Field, PartialType, InputType, Int } from '@nestjs/graphql'
import { AddUserChanel } from './add-user-chanel.input'

@InputType()
export class UpdateChanelUserInput extends PartialType(AddUserChanel) {
	@Field(() => Int)
	user_id: number;

	@Field(() => Int, {nullable: true})
	chanel_id?: number;

	@Field(() => Boolean, {nullable: true})
	is_muted?: boolean;

	@Field(() => Boolean, {nullable: true})
	is_admin?: boolean;

	@Field(() =>  Int, {nullable: true})
	mute_start_time?: number;
}