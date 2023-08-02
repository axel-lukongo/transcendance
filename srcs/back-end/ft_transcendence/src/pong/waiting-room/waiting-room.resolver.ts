import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { WaitingRoomService } from './waiting-room.service';
import { WaitingRoom } from './entities/waiting-room.entity';
// import { CreateWaitingRoomInput } from './dto/create-waiting-room.input';
import { UpdateWaitingRoomInput } from './dto/update-waiting-room.input';
import { Player } from '../player/entities/player.entity';
import { PlayerResolver } from '../player/player.resolver';

@Resolver(() => WaitingRoom)
export class WaitingRoomResolver {
  constructor(private readonly waitingRoomService: WaitingRoomService,
              private readonly playerResolver: PlayerResolver) {}

  @Mutation(() => WaitingRoom)
  createWaitingRoom() {
    return this.waitingRoomService.create();
  }

  @Query(() => [WaitingRoom], { name: 'findWaitingRooms' })
  findWaitingRooms() {
    return this.waitingRoomService.findAll();
  }

  @Query(() => WaitingRoom, { name: 'findWaitingRoom' })
  findWaitingRoom(@Args('id', { type: () => Int }) id: number) {
    return this.waitingRoomService.findUnique(id);
  }

  // @ResolveField(() =>[Player])
  //   async waitingList(@Parent() waitingRoon: WaitingRoom) {
  //     return this.playerResolver.findWaitingRoomPlayer(waitingRoon.id);
  //   }


  // @Mutation(() => WaitingRoom)
  // async updateWaitingRoom( @Args('id') id: number, @Args('player') player: Player,) {
  //   return this.waitingRoomService.update(id, player);
  // }

  @Mutation(() => WaitingRoom)
  removeWaitingRoom(@Args('id', { type: () => Int }) id: number) {
    return this.waitingRoomService.remove(id);
  }
}
