import { ObjectType, Field, Int } from '@nestjs/graphql';
import { WaitingRoom } from 'src/pong/waiting-room/entities/waiting-room.entity';

@ObjectType()
export class PongInvite {

  @Field(() => Int )
  userId1: number;
  
  @Field(() => Int )
  userId2: number;

  @Field(() => Int )
  waitingRoomId: number;

  @Field(() => WaitingRoom)
  waitingRoom : WaitingRoom

}
