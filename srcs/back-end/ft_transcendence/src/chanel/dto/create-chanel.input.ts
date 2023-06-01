import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateChanelInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
