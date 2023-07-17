import { User } from '../entities/user.entity';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(User) {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  token?: string;

  @Field(() => Boolean, { nullable: true })
  is_connecting?: boolean;
 
  @Field({ nullable: true })
  tfa_code?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  intra_login?: string;

  @Field({ nullable: true })
  nickname?: string;

  @Field({ nullable: true })
  avatar?: string;
}
