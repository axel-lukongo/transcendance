import { Resolver, Query, Mutation, Args, Int, Subscription } from '@nestjs/graphql';
import { PositionPlayerService, PositionBallService } from './position_game.service';
import { PositionPlayer } from './entities/position_game.entity';
import { PositionBall } from './entities/position_game.entity';
import { CreatePositionPlayerInput } from './dto/create-position_game.input';
import { UpdatePositionPlayerInput } from './dto/update-position_game.input';
import { UpdatePositionBallInput } from './dto/update-position_game.input';
import { CreatePositionBallInput } from './dto/create-position_game.input';
import { PubSub } from 'graphql-subscriptions';


const pubSub = new PubSub();
const UpdatePosPlayer = 'updatePosPlayer';
const UpdatePosBall = 'updatePosBall';


@Resolver(() => PositionPlayer)
export class PositionPlayerResolver {
  constructor(private readonly PositionPlayerService: PositionPlayerService) {}

  @Mutation(() => PositionPlayer)
  createPositionPlayer(@Args('createPositionPlayerInput') createPositionPlayerInput: CreatePositionPlayerInput) {
    return this.PositionPlayerService.create(createPositionPlayerInput);
  }

  @Query(() => [PositionPlayer], { name: 'PositionPlayer' })
  findAll() {
    return this.PositionPlayerService.findAll();
  }

  @Query(() => PositionPlayer, { name: 'PositionPlayer' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.PositionPlayerService.findOne(id);
  }

  @Mutation(() => PositionPlayer)
  updatePositionPlayer(@Args('updatePositionPlayerInput') updatePositionPlayerInput: UpdatePositionPlayerInput) {
	const newposplayer = this.PositionPlayerService.update(updatePositionPlayerInput.id, updatePositionPlayerInput);
	pubSub.publish(UpdatePosPlayer, {
		updateposplayer: newposplayer,
	});
	return newposplayer;
  }

  @Mutation(() => PositionPlayer)
  removePositionPlayer(@Args('id', { type: () => Int }) id: number) {
    return this.PositionPlayerService.remove(id);
  }

  @Subscription(() => PositionPlayer, {
	filter: async (payload, variables) => {
		const resolvedPayload = await payload.updateposplayer;
		return resolvedPayload.channel_id === variables.channel_id;
		}
	})
	updateposplayer(@Args('player_id', { type: () => Int }) player_id: number) {
		return pubSub.asyncIterator(UpdatePosPlayer);
	}

}





@Resolver(() => PositionBall)
export class PositionBallResolver {
  constructor(private readonly PositionBallService: PositionBallService) {}

  @Mutation(() => PositionBall)
  createPositionBall(@Args('createPositionBallInput') createPositionBallInput: CreatePositionBallInput) {
    return this.PositionBallService.create(createPositionBallInput);
  }

  @Query(() => [PositionBall], { name: 'PositionBall' })
  findAll() {
    return this.PositionBallService.findAll();
  }

  @Query(() => PositionBall, { name: 'PositionBall' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.PositionBallService.findOne(id);
  }

  @Mutation(() => PositionBall)
  updatePositionBall(@Args('updatePositionBallInput') updatePositionBallInput: UpdatePositionBallInput) {
	const newposball = this.PositionBallService.update(updatePositionBallInput.id, updatePositionBallInput);

	pubSub.publish(UpdatePosBall, {
		updateposball: newposball,
	});

	return newposball;
  }

  @Mutation(() => PositionBall)
  removePositionBall(@Args('id', { type: () => Int }) id: number) {
    return this.PositionBallService.remove(id);
  }


  @Subscription(() => PositionBall, {
	filter: async (payload, variables) => {
		const resolvedPayload = await payload.updateposball;
		return resolvedPayload.channel_id === variables.channel_id;
		}
	})
	updateposball(@Args('ball_id', { type: () => Int }) ball_id: number) {
		return pubSub.asyncIterator(UpdatePosBall);
	}
}