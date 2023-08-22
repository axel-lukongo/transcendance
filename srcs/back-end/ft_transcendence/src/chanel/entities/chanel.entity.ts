import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Chanel {

	@Field(() => Int)
	id: number;
	
	@Field(() => Int)
	owner_id: number;
	
	@Field()
	chanel_name: string;

	@Field({nullable: true})
	chanel_size: number;

	@Field()
	max_users: number;

	@Field({nullable: true})
	logo: string;

	@Field(() => Boolean)
	private: boolean;

	@Field(() => Boolean, {nullable: true})
	directMsg?: boolean;

	@Field({nullable: true})
	interlocutor_id: number;

}