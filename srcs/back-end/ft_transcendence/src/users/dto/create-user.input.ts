import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => Int)
  token: number;

  @Field()
  nickname: string;

  @Field({ nullable: true })
  avatar?: string;
}
