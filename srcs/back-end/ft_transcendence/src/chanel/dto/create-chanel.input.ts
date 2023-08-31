import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateChanelInput {

  @Field(() => Boolean)
  private: boolean;

  @Field(() => Int)
  owner_id: number;
  
  @Field(() => String)
  chanel_name: string;

  @Field(() => String, {nullable: true})
  logo: string;

  @Field(() => Int, {nullable: true})
  interlocutor_id: number;

  @Field(() => Boolean, {nullable: true})
  directMsg?: boolean;

  @Field(() => String, {nullable: true})
  interlocutor_avatar?: string;

  @Field(() => String, {nullable: true})
  interlocutor_name?: string;

}
