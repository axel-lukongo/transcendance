import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { ChanelService } from './chanel.service';
import { Chanel } from './entities/chanel.entity';
import { CreateChanelInput } from './dto/create-chanel.input';
import { UpdateChanelInput } from './dto/update-chanel.input';
import { UsersChanels } from '../user-chanels/entities/user_chanel.entity';
import { AddUserChanel } from '../user-chanels/dto/add-user-chanel.input';

@Resolver(() => Chanel)
export class ChanelResolver {
  constructor(private readonly chanelService: ChanelService) {}

  @Mutation(() => Chanel)
  createChanel(@Args('createChanelInput') createChanelInput: CreateChanelInput) {
    return this.chanelService.create(createChanelInput);
  }

  @Query(() => Chanel, { name: 'Channel_findOne' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.chanelService.findOne(id);
  }
  
  @Mutation(() => Chanel, { name: 'Channel_update' })
  updateChanel(@Args('updateChanelInput') _updateArgs: UpdateChanelInput): Promise<Chanel> {
    return this.chanelService.update(_updateArgs.id, _updateArgs);
  }
  
  @Mutation(() => Chanel)
  removeChanel(@Args('id', { type: () => Int }) id: number) {
    return this.chanelService.remove(id);
  }

  @Query(() => [Chanel], {name: "chanels"})
  myChanels(@Args("user_id", {type: () => Int}) user_id: number) {
    return this.chanelService.getOwnChanels(user_id);
  }
  
}
