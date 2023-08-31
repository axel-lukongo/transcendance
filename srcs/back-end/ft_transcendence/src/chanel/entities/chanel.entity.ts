import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
@ObjectType()
export class Chanel {

	@Field(() => Int)
	id: number;
	
	@Field(() => Int)
	owner_id: number;
	
	@Field()
	chanel_name: string;

	@Field({nullable: true})
	logo: string;

	@Field(() => Boolean)
	private: boolean;

	@Field({nullable: true})
	interlocutor_id: number;

	@Field(() => Boolean, {nullable: true})
	directMsg?: boolean;

	@Field(() => User, {nullable: true})
	interlocutor?: User

	@Field({nullable: true})
	interlocutor_avatar?: string;

	@Field({nullable: true})
	interlocutor_name?: string;
}