import { CreateBannedInput } from './create-banned.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBannedInput extends PartialType(CreateBannedInput) {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  user_id: number;

  @Field(() => Int)
  channel_id: number;

}
