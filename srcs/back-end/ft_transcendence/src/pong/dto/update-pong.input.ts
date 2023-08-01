import { CreatePongInput } from './create-pong.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePongInput extends PartialType(CreatePongInput) {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  scoreUser1?: number 

  @Field(() => Int)
  scoreUser2?: number 

  @Field(() => Int)
  loserId? : number 

  @Field(() => Int)
  winnerId?: number
}
