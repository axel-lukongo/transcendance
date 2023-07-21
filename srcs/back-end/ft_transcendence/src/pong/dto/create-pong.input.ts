import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePongInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
