import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBannedInput {
  @Field(() => Int)
  user_id: number;

  @Field(() => Int)
  channel_id: number;
}
