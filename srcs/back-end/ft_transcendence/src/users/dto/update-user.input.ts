import { User } from '../entities/user.entity';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(User) {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  token?: string;

  @Field({ nullable: true })
  state?: number;

  @Field({ nullable: true })
  connection_status?: number;

  @Field({ nullable: true })
  tfa_code?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  nickname?: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field({ nullable: true })
  level?: number;

  @Field({ nullable: true })
  rank?: string;
}
