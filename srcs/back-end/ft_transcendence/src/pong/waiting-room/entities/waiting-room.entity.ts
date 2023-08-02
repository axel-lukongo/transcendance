import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Player } from 'src/pong/player/entities/player.entity';

@ObjectType()
export class WaitingRoom {
  @Field(() => Int)
  id: number;

  @Field(() => [Player], { nullable: true })
  waitingList?: Player[];
}