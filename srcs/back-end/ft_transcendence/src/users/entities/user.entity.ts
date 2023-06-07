import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Chanel } from 'src/chanel/entities/chanel.entity';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

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

/*
model User {
  id        Int             @id @default(autoincrement())
  token     Int             @unique
  nickname  String          @unique
  avatar    String?
  userPong  Pong[]          @relation("User1")
  userPong2 Pong[]          @relation("User2")
  chanels   Users_Chanels[]
  own_chan  Chanel[]
  sender    Message[]       @relation("Send")
  receiver  Message[]       @relation("Receive")
}
*/