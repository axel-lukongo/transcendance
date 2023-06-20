import { Field, PartialType, InputType, Int } from '@nestjs/graphql'
import { AddChanelUserInput } from './add-chanel-user.input'

export class UpdateChanelUser extends PartialType(AddChanelUserInput) {
	@Field(() => Int)
	id: number;
}