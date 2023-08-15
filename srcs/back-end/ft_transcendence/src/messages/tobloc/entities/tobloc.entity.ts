import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
@ObjectType()
export class Tobloc {

	@Field(() => Int)
	id: number;

	@Field(() => Int)
  	blocker_id: number;

	@Field(() => Int)
  	blocked_id: number;

	@Field(() => User, { nullable: true })
	blocked: User;
}
