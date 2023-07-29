import { Resolver, Query, Mutation, Args, Int, Subscription } from '@nestjs/graphql';
import { Player, } from './entities/player.entity';
import { PlayerService,  } from './player.service';
import { CreatePlayerInput, } from './dto/create-player.input';
import { UpdatePlayerInput, } from './dto/update-player.input';
import { PubSub } from 'graphql-subscriptions';

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

  @Mutation(() => Player)
  removePlayer(@Args('id', { type: () => Int }) id: number) {
    return this.playerService.remove(id);
  }
  

  /* WHEN A PLAYER IS CREATED.
    THE WS RETURN ALL PLAYER IN THE FIRST WAINTINGROOM  */
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
    const playerUp =  this.playerService.update(updatePlayerInput.id, updatePlayerInput);
      
    pubSub.publish(PLAYER_UPDATED_EVENT, {
      playerUpdatedSubscription: playerUp,
    });
    return playerUp;
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
