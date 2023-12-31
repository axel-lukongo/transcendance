 import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  nickname: string;

  @Field({ nullable: true })
  avatar?: string;

}
