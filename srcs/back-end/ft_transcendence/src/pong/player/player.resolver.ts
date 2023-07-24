import { Resolver, Query, Mutation, Args, Int, Subscription } from '@nestjs/graphql';
import { Player, PositionBall} from './entities/player.entity';
import { CreatePlayerInput, CreatePositionBallInput} from './dto/create-player.input';
import { UpdatePlayerInput, UpdatePositionBallInput} from './dto/update-player.input';
import { PlayerService, PositionBallService } from './player.service';
import { PubSub } from 'graphql-subscriptions';
import { query } from 'express';
import { WaitingRoom } from '@prisma/client';

const pubSub = new PubSub();
const PLAYER_UPDATED_EVENT = 'playerUp';

@Resolver(() => Player)
export class PlayerResolver {
  constructor(private readonly playerService: PlayerService) {}

  @Mutation(() => Player)
  createPlayer(@Args('createPlayerInput') createPlayerInput: CreatePlayerInput) {
    return this.playerService.create(createPlayerInput);
  }

  @Query(() => [Player], { name: 'Players' })
  findAllPlayers() {
    return this.playerService.findAll();
  }

  @Query(() => Player, { name: 'isPlayerInGame' })
  isPlayerInGame(@Args('id', { type: () => Int }) id: number) {
    return this.playerService.findUnique(id);
  }

  @Mutation(() => Player)
  async updatePlayer(@Args('updatePlayerInput') updatePlayerInput: UpdatePlayerInput) {
    const newPlayer = await this.playerService.update(updatePlayerInput.id, updatePlayerInput);
      
    pubSub.publish(PLAYER_UPDATED_EVENT, {
      playerUpdated: newPlayer,
    });
    return newPlayer;
  }

  @Mutation(() => Player)
  removePlayer(@Args('id', { type: () => Int }) id: number) {
    return this.playerService.remove(id);
  }

  @Subscription(() => Player, {
    filter: async (payload, variables) => {
      const resolvedPayload = await payload.playerUpdated;
      return resolvedPayload.id === variables.id;
    }
  })

  playerUpdated(@Args('id', { type: () => Int }) id: number) {
    return  pubSub.asyncIterator(PLAYER_UPDATED_EVENT);
  }

  @Query(() => [Player])
    async findWaitingRoomPlayer(waitingRoom: WaitingRoom) {
      return this.playerService.findWaitingRoomPlayer(waitingRoom.id)
    }
}



@Resolver(() => PositionBall)
export class PositionBallResolver {
  // constructor(private readonly PositionBallService: PositionBallService) {}

  // @Mutation(() => PositionBall)
  // createPositionBall(@Args('createPositionBallInput') createPositionBallInput: CreatePositionBallInput) {
  //   return this.PositionBallService.create(createPositionBallInput);
  // }

  // @Query(() => [PositionBall], { name: 'PositionBall' })
  // findAll() {
  //   return this.PositionBallService.findAll();
  // }

  // @Query(() => PositionBall, { name: 'PositionBall' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.PositionBallService.findOne(id);
  // }

  // @Mutation(() => PositionBall)
  // updatePositionBall(@Args('updatePositionBallInput') updatePositionBallInput: UpdatePositionBallInput) {
	// const newposball = this.PositionBallService.update(updatePositionBallInput.id, updatePositionBallInput);

	// pubSub.publish(UpdatePosBall, {
	// 	updateposball: newposball,
	// });

	// return newposball;
  // }

  // @Mutation(() => PositionBall)
  // removePositionBall(@Args('id', { type: () => Int }) id: number) {
  //   return this.PositionBallService.remove(id);
  // }


  // @Subscription(() => PositionBall, {
	// filter: async (payload, variables) => {
	// 	const resolvedPayload = await payload.updateposball;
	// 	return resolvedPayload.channel_id === variables.channel_id;
	// 	}
	// })
	// updateposball(@Args('ball_id', { type: () => Int }) ball_id: number) {
	// 	return pubSub.asyncIterator(UpdatePosBall);
	// }
}