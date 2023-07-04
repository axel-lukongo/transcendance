import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAuthenticationInput {
  @Field()
  nickname: string;

  @Field({ nullable: true })
  avatar?: string;
}
