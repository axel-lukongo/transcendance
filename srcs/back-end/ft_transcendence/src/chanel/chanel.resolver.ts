import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ChanelService } from './chanel.service';
import { Chanel } from './entities/chanel.entity';
import { CreateChanelInput } from './dto/create-chanel.input';
// import { UpdateChanelInput } from './dto/update-chanel.input';

@Resolver(() => Chanel)
export class ChanelResolver {
  constructor(private readonly chanelService: ChanelService) {}

  @Mutation(() => Chanel)
  createChanel(@Args('createChanelInput') createChanelInput: CreateChanelInput) {
    return this.chanelService.create(createChanelInput);
  }

  @Query(() => [Chanel], { name: 'chanell' })
  findAll() {
    return this.chanelService.findAll();
  }

  @Query(() => Chanel, { name: 'chanel' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.chanelService.findOne(id);
  }

//   @Mutation(() => Chanel)
//   updateChanel(@Args('updateChanelInput') updateChanelInput: UpdateChanelInput) {
//     return this.chanelService.update(updateChanelInput.id, updateChanelInput);
//   }

  @Mutation(() => Chanel)
  removeChanel(@Args('id', { type: () => Int }) id: number) {
    return this.chanelService.remove(id);
  }
}
