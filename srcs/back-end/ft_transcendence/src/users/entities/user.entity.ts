import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  token: string;

  @Field(() => Int)
  state: number;

  @Field(() => Int)
  connection_status: number;

  @Field({ nullable: true })
  tfa_code?: string;

  @Field()
  email: string;

  @Field()
  nickname: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field(() => Float)
  level: number;

  @Field()
  rank: string;
  
}
