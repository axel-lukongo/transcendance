import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAuthenticationInput {
  @Field()
  nickname: string;

  @Field({ nullable: true })
  avatar?: string;
}
