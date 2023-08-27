import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePongInviteInput {
  
  @Field(() => Int )
  userId1: number;
  
  @Field(() => Int )
  userId2: number;

  @Field(() => Int )
  waitingRoomId: number;
}

