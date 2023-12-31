import { Resolver, Query, Mutation, Args, Int, Subscription } from '@nestjs/graphql';
import { Player, } from './entities/player.entity';
import { PlayerService,  } from './player.service';
import { CreatePlayerInput, } from './dto/create-player.input';
import { UpdatePlayerInput, } from './dto/update-player.input';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();
const PLAYER_UPDATED_EVENT = 'playerUp';

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

  @Query(() => Player, { name: 'findPlayerByUserId' })
  findPlayerByUserId(@Args('userId', { type: () => Int }) userId: number) {
    return this.playerService.findUniqueByUserId(userId);
  }


  @Mutation(() => Player)
  removePlayer(@Args('id', { type: () => Int }) id: number) {
    return this.playerService.remove(id);
  }
  

  /* WHEN A PLAYER IS CREATED.
    THE WS RETURN ALL PLAYER IN THE FIRST WAINTINGROOM  */
  @Query(() => [Player])
  async findAllPlayersInWaitingRoom(@Args('id', { type: () => Int }) id: number) {
    return this.playerService.findAllPlayersInWaitingRoom(id);
  }

  @Mutation(() => Player)
  async createPlayer(@Args('createPlayerInput') createPlayerInput: CreatePlayerInput) {
    return  this.playerService.create(createPlayerInput);
  }

  async setPlayer(userId: number, room : number) {
    let player = await this.findPlayerByUserId(userId);
    
    if (!player) {
      
      const createPlayerInput: CreatePlayerInput = {
        userId: userId,
        waitingRoomId: room,
      };
      
      player = await this.createPlayer(createPlayerInput);
      }
    return player;
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
