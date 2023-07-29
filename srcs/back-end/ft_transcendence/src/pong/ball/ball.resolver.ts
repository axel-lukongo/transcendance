import { Resolver, Query, Mutation, Args, Int, Subscription } from '@nestjs/graphql';
import { BallService } from './ball.service';
import { Ball } from './entities/ball.entity';
import { UpdateBallInput } from './dto/update-ball.input';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();
const BALL_UPDATE_EVENT = 'ballUp';

@Resolver(() => Ball)
export class BallResolver {
  constructor(private readonly ballService: BallService) {}

  @Mutation(() => Ball)
  createBall() {
    return this.ballService.create();
  }

  @Query(() => [Ball], { name: 'Ball' })
  findAll() {
    return this.ballService.findAll();
  }

  @Query(() => Ball, { name: 'Balls' })
  findUnique(@Args('id', { type: () => Int }) id: number) {
    return this.ballService.findUnique(id);
  }
  
  @Mutation(() => Ball)
  removeBall(@Args('id', { type: () => Int }) id: number) {
    return this.ballService.remove(id);
  }
  
  @Mutation(() => Ball)
  updateBall(@Args('updateBallInput') updateBallInput: UpdateBallInput) {
    const ballUp = this.ballService.update(updateBallInput.id, updateBallInput);

    pubSub.publish(BALL_UPDATE_EVENT, {
      ballUpdatedSubscription: ballUp,
    });
    return ballUp;
  }
  @Subscription(() => Ball, {
    filter: async (payload, variables) => {
      const resolvedPayload = await payload.ballUpdatedSubscription;
      return resolvedPayload.id === variables.id;
    }
  })
  ballUpdatedSubscription(@Args('id', { type: () => Int }) id: number){
    return pubSub.asyncIterator(BALL_UPDATE_EVENT);
  }


}
