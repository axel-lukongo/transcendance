import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  token: number;

  @Field()
  nickname: string;

  @Field({ nullable: true })
  avatar?: string;
}
