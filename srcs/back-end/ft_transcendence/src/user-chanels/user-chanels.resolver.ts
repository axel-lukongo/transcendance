import { Resolver, Query, Args, Int, Mutation, ResolveField, Parent, Context } from '@nestjs/graphql';
import { UsersChanels } from './entities/user_chanel.entity';
import { ChanelService } from 'src/chanel/chanel.service';
import { UserChanelsService } from './user-chanels.service';
import { AddUserChanel } from './dto/add-user-chanel.input';
import { Chanel } from 'src/chanel/entities/chanel.entity';
import {  UpdateChanelUserInput } from './dto/update-chanel-user.input';
import { type } from 'os';

@Resolver(() => UsersChanels)
export class UserChanelsResolver {

	constructor(private readonly chanelService: ChanelService,
				private readonly userChanelService: UserChanelsService) {}



	@Mutation(() => UsersChanels)
	addUser(@Args('addUserChanel') addUserChanel: AddUserChanel) {
		return this.userChanelService.addUser(addUserChanel);
	}



	@ResolveField(() => Chanel, {name: "chanels"})
	ChanelsOwner(@Parent() chanel: UsersChanels) {
		return this.chanelService.findOne(chanel.chanel_id);
	}



	@Mutation(() => UsersChanels, {name: "acceptRequest"})
	acceptRequest(@Args("key") Requestkey: UpdateChanelUserInput) {
		return this.userChanelService.acceptRequest(Requestkey);
	}



	@Query(() => [UsersChanels], {name: "chanelsRequest"})
	chanelRequest(@Args("user_id", {type: () => Int}) user_id: number) {
		return this.userChanelService.findMyRequestChanels(user_id);
	}



	@Query(() => [UsersChanels], { name: 'myChanels' })
	findMyChanels(@Args("user_id", {type: () => Int}) user_id: number,
	@Args("private_chan", {type: () => Boolean}) private_chan: boolean) {
	  return this.userChanelService.findMyChanels(user_id, private_chan);
	}


	@Query(() => [UsersChanels], { name: 'ChannelMembers' })
	findMembers(@Args("channel_id", {type: () => Int}) channel_id: number){
		return this.userChanelService.findMembersOfChan(channel_id);
	}


	@Mutation(() => UsersChanels, {name: "deleteChanelUser"})
	async deleteChanelUser(@Args("key") key: UpdateChanelUserInput, @Context() context) {
		const userId = context.req.userId; // je recuperer l'id de la personne qui fait la requete

		const I_amAdmin = await this.userChanelService.isAdministrator(key, key.user_id);
		const hes_Admin = await this.userChanelService.isAdministrator(key, userId);

		if (I_amAdmin || !hes_Admin) {
			console.log('ici');
			return 'you don t have the permission'
		}
		return this.userChanelService.delete(key);
	}


	@Mutation(() => UsersChanels, {name: "updateChanelUser"})
	async updateChanelUser(@Args("key") key: UpdateChanelUserInput, @Context() context){
		
		const userId = context.req.userId; // je recuperer l'id de la personne qui fait la requete
		const isAdmin = await this.userChanelService.isAdministrator(key, userId);

		if(!isAdmin){
			return 'you don t have the permission';
		}

		return this.userChanelService.update(key);
	}
	
}
