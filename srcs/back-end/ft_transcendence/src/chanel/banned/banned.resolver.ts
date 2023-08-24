import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { BannedService } from './banned.service';
import { Banned } from './entities/banned.entity';
import { CreateBannedInput } from './dto/create-banned.input';
import { UpdateBannedInput } from './dto/update-banned.input';
import { UserChanelsService } from 'src/user-chanels/user-chanels.service';
@Resolver(() => Banned)
export class BannedResolver {
  constructor(private readonly bannedService: BannedService,
	private readonly userChanelService: UserChanelsService) {}

  @Mutation(() => Banned)
 async createBanned(@Args('createBannedInput') createBannedInput: CreateBannedInput, @Context() context) {
	const userId = context.req.userId; // je recuperer l'id de la personne qui fait la requete
	const I_amAdmin = await this.userChanelService.isAdministrator(createBannedInput.channel_id, userId);
	const he_is_Owner = await this.userChanelService.IsOwnerInChannel(createBannedInput.user_id, createBannedInput.channel_id);

	if(I_amAdmin && !he_is_Owner)
	    return this.bannedService.create(createBannedInput);
	else
		return 'action denied';
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
