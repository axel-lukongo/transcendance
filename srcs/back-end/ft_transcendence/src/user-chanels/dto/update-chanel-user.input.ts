import { Field, PartialType, InputType, Int } from '@nestjs/graphql'
import { AddUserChanel } from './add-user-chanel.input'

export class UpdateChanelUser extends PartialType(AddUserChanel) {
	@Field(() => Int)
	id: number;
}