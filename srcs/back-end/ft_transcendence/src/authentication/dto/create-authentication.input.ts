import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAuthenticationInput {
  @Field()
  email: string;

  @Field()
  nickname: string;

  @Field({ nullable: true })
  avatar?: string;
}
