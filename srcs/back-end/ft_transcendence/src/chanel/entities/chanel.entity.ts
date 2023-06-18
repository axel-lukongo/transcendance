import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Message } from 'src/messages/entities/messages.entity';

@ObjectType()
export class Chanel {
	@Field(type => Int)
	id: number;

	@Field({nullable: true})
	chanel_name: string;

	@Field({nullable: true})
	chanel_size: number;

	@Field({nullable: true})
	max_users: number;

	// @Field(() => Message, {nullable: true})
	// messages?: Message[];

}
