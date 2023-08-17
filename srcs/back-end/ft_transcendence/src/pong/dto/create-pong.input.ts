import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePongInput {
  @Field(() => Int)
  userId1: number;

  @Field(() => Int)
  userId2: number;

}
