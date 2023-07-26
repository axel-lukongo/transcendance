import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateChanelInput } from './create-chanel.input';

@InputType()
export class UpdateChanelInput extends PartialType(CreateChanelInput){
  @Field(() => Int)
  id: number;
}
