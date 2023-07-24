import { Player } from 'src/pong/player/entities/player.entity';
import { WaitingRoom } from '../entities/waiting-room.entity';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateWaitingRoomInput  {
  
  @Field(() => Int)
  id: number;

}
