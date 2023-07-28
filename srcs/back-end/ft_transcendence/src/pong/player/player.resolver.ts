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
const PLAYER_CREATE_EVENT = 'playercCreated';

@Resolver(() => Player)
export class PlayerResolver {
  constructor(private readonly playerService: PlayerService) {}

  
  @Query(() => [Player], { name: 'Players' })
  findAllPlayers() {
    return this.playerService.findAll();
  }

  
  @Query(() => Player, { name: 'findPlayer' })
  findPlayer(@Args('id', { type: () => Int }) id: number) {
    return this.playerService.findUnique(id);
  }

  @Query(() => [Player], { name: 'findMyGame' })
  findMyGame(@Args('userId', { type: () => Int }) userId: number) {
    return this.playerService.findMyGame(userId);
  }
  
  @Mutation(() => Player)
  removePlayer(@Args('id', { type: () => Int }) id: number) {
    return this.playerService.remove(id);
  }
  

  /* WHEN A PLAYER IS CREATED.
    WE RETURN IN THE WS ALL PLAYER IN THE FIRST WAINTINGROOM  */
  @Query(() => [Player])
  async findWaitingRoomPlayer(@Args('id', { type: () => Int }) id: number) {
    return this.playerService.findWaitingRoomPlayers(id);
  }

  @Mutation(() => Player)
  async createPlayer(@Args('createPlayerInput') createPlayerInput: CreatePlayerInput) {
    const newPlayer =  this.playerService.create(createPlayerInput);

    pubSub.publish(PLAYER_CREATE_EVENT, {
      listPlayerSubscription : this.findWaitingRoomPlayer((await newPlayer).waitingRoomId)
    })
    return newPlayer;
  }
  @Subscription(() => [Player],  {
    filter: async (payload, variables) => {
      const resolvedPayload = await payload.listPlayerSubscription;
      return resolvedPayload.id === variables.id;
    }
  })
  listPlayerSubscription() {
    return pubSub.asyncIterator(PLAYER_CREATE_EVENT);
  }
 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  */


  @Mutation(() => Player)
   updatePlayer(@Args('updatePlayerInput') updatePlayerInput: UpdatePlayerInput) {
    const newPlayer =  this.playerService.update(updatePlayerInput.id, updatePlayerInput);
      
    pubSub.publish(PLAYER_UPDATED_EVENT, {
      playerUpdatedSubscription: newPlayer,
    });
    return newPlayer;
  }
  @Subscription(() => Player, {
    filter: async (payload, variables) => {
      const resolvedPayload = await payload.playerUpdatedSubscription;
      return resolvedPayload.id === variables.id;
    }
  })
  playerUpdatedSubscription(@Args('id', { type: () => Int }) id: number) {
    return  pubSub.asyncIterator(PLAYER_UPDATED_EVENT);
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