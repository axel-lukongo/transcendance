import { InputType, Int, Field } from '@nestjs/graphql' 

@InputType()
export class AddChanelUserInput {
	@Field(() => Int)
	user_id: number;

	@Field(() => Int)
	chanel_id: number;
}