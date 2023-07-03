import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  token: string;

  @Field(() => Boolean)
  is_connecting: boolean;

  @Field()
  email: string;

  @Field()
  intra_login: string;

  @Field()
  nickname: string;

  @Field({ nullable: true })
  avatar?: string;

  // @Field(() => [Pong])
  // userPong: Pong[];

  // @Field(() => [Pong])
  // userPong2: Pong[];

  // @Field(() => [Users_Chanels])
  // chanels: Users_Chanels[];

  // @Field(() => [Chanel])
  // own_chan: Chanel[];

  // @Field(() => [Message])
  // sender: Message[];

  // @Field(() => [Message])
  // receiver: Message[];
}
