import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateChanelInput {

  @Field(() => Boolean)
  private: boolean;

  @Field(() => Int)
  owner_id: number;
  
  @Field(() => String)
  chanel_name: string;

  @Field(() => Int)
  chanel_size: number;

  @Field(() => Int)
  max_users: number;

  @Field(() => String, {nullable: true})
  logo: string;

}
