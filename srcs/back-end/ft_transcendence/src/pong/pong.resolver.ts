import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PongService } from './pong.service';
import { Pong } from './entities/pong.entity';
import { CreatePongInput } from './dto/create-pong.input';
import { UpdatePongInput } from './dto/update-pong.input';

@Resolver(() => Pong)
export class PongResolver {
  constructor(private readonly pongService: PongService) {}

  @Mutation(() => Pong)
  createPong(@Args('createPongInput') createPongInput: CreatePongInput) {
    return this.pongService.create(createPongInput);
  }

  @Query(() => [Pong], { name: 'Pongs' })
  findAll() {
    return this.pongService.findAll();
  }

  @Query(() => Pong, { name: 'Pong' })
  findUnique(@Args('id', { type: () => Int }) id: number) {
    return this.pongService.findUnique(id);
  }


  @Mutation(() => Pong)
  updatePong(@Args('updatePongInput') updatePongInput: UpdatePongInput) {
    return this.pongService.update(updatePongInput.id, updatePongInput);
  }

  @Mutation(() => Pong)
  removePong(@Args('id', { type: () => Int }) id: number) {
    return this.pongService.remove(id);
  }
}
