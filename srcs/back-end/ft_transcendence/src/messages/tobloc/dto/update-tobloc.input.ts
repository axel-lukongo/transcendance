import { CreateToblocInput } from './create-tobloc.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateToblocInput extends PartialType(CreateToblocInput) {
  @Field(() => Int)
  id: number;
}
