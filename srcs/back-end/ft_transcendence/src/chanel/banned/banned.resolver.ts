import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BannedService } from './banned.service';
import { Banned } from './entities/banned.entity';
import { CreateBannedInput } from './dto/create-banned.input';
import { UpdateBannedInput } from './dto/update-banned.input';

@Resolver(() => Banned)
export class BannedResolver {
  constructor(private readonly bannedService: BannedService) {}

  @Mutation(() => Banned)
  createBanned(@Args('createBannedInput') createBannedInput: CreateBannedInput) {
    return this.bannedService.create(createBannedInput);
  }

  @Query(() => [Banned], { name: 'banned_list' })
  async findAll(
	@Args('channelId', { type: () => Int }) channelId: number,
  	) {
    return this.bannedService.findAll(channelId);
  }

//   @Query(() => Banned, { name: 'banned' })
//   findOne(@Args('id', { type: () => Int }) id: number) {
//     return this.bannedService.findOne(id);
//   }

//   @Mutation(() => Banned)
//   updateBanned(@Args('updateBannedInput') updateBannedInput: UpdateBannedInput) {
//     return this.bannedService.update(updateBannedInput.id, updateBannedInput);
//   }

  @Mutation(() => Banned)
  removeBanned(
	@Args('userId', { type: () => Int }) userId: number,
	@Args('channelId', { type: () => Int }) channelId: number,
	) {
    return this.bannedService.remove(userId, channelId);
  }
}
