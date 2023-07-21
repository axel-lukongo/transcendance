import { CreatePongInput } from './create-pong.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePongInput extends PartialType(CreatePongInput) {
  @Field(() => Int)
  id: number;
}
