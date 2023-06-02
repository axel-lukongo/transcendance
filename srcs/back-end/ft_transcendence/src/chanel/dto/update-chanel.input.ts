import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateChanelInput {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  chanel_name?: string;

  @Field({ nullable: true })
  chanel_size?: number;

  @Field({ nullable: true })
  max_users?: number;
}
