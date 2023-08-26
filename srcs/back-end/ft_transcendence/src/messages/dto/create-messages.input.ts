import { InputType, Field, Int } from '@nestjs/graphql'

@InputType()
export class CreateMessageInput {

	@Field()
	content: string;

	@Field(() => Date, {nullable: true})
	sent_at?: Date;

	@Field(() => Int)
	sender_id: number;

	@Field(() => Int, {nullable: true})
	channel_id?: number;

	@Field(() => Boolean, {nullable: true})
	invite_game:boolean;
}
