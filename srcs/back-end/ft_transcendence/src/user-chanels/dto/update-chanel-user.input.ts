import { Field, PartialType, InputType, Int } from '@nestjs/graphql'
import { AddUserChanel } from './add-user-chanel.input'

@InputType()
export class UpdateChanelUserInput extends PartialType(AddUserChanel) {
	@Field(() => Int)
	user_id: number;

	@Field(() => Int)
	chanel_id: number;
}