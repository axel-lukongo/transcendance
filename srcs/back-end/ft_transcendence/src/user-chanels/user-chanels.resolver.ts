import { Resolver, Query, Args, Int, Mutation, ResolveField, Parent } from '@nestjs/graphql';
import { UsersChanels } from './entities/user_chanel.entity';
import { ChanelService } from 'src/chanel/chanel.service';
import { UserChanelsService } from './user-chanels.service';
import { AddUserChanel } from './dto/add-user-chanel.input';
import { Chanel } from 'src/chanel/entities/chanel.entity';

@Resolver(() => UsersChanels)
export class UserChanelsResolver {

	constructor(private readonly chanelService: ChanelService,
				private readonly userChanelService: UserChanelsService) {}

	@Query(() => [UsersChanels], { name: 'myChanels' })
	findMyChanels(@Args("user_id", {type: () => Int}) user_id: number) {
	  return this.userChanelService.findMyChanels(user_id);
	}

	@Mutation(() => UsersChanels)
	addUser(@Args('addUserChanel') addUserChanel: AddUserChanel) {
	  return this.userChanelService.addUser(addUserChanel);
	}

	@ResolveField(() => Chanel, {name: "chanels"})
	ChanelsOwner(@Parent() chanel: UsersChanels) {
		return this.chanelService.findOne(chanel.chanel_id);
	}
}
