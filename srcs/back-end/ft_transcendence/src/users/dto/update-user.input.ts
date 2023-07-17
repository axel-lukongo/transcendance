import { User } from '../entities/user.entity';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(User) {
  @Field(() => Int)
  id: number;
}
