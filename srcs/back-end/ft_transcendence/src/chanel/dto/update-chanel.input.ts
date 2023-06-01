import { CreateChanelInput } from './create-chanel.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateChanelInput extends PartialType(CreateChanelInput) {
  @Field(() => Int)
  id: number;
}
