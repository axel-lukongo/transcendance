import { Field, Int } from "@nestjs/graphql";
import { ObjectType } from "@nestjs/graphql";
import { User } from 'src/users/entities/user.entity';


@ObjectType()
export class UsersChanels {
	@Field(() => Int)
	user_id: number;

	@Field(() => Int)
	chanel_id: number;

	@Field(() => Boolean)
	pending: boolean;

	@Field(() => Boolean, { nullable: true })
	is_muted: boolean;

	@Field(() => Boolean, { nullable: true })
	is_admin: boolean;

	@Field(() => User, { nullable: true })
	user: User;
}