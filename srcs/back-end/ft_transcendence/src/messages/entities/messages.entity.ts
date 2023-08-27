import { ObjectType, Field, Int } from '@nestjs/graphql'
import { User } from 'src/users/entities/user.entity'
import { Chanel } from 'src/chanel/entities/chanel.entity'

@ObjectType()
export class Message {
	@Field(() => Int)
	id: number;

	@Field()
	content: string;

	@Field(() => Date)
	sent_at: Date;

	@Field(() => Int)
	sender_id: number;

	@Field(() => User)
	sender: User;

	@Field(() => Int, {nullable: true})
	channel_id?: number;

	@Field(() => Chanel, {nullable: true})
	channel?: Chanel;

	@Field(() => Boolean, {nullable: true})
	invite_game:boolean;
}
