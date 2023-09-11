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
	async addUser(@Args('addUserChanel') addUserChanel: AddUserChanel) {
		const isBanned = await this.userChanelService.UserBanInChannel(addUserChanel.user_id, addUserChanel.chanel_id)

		if(isBanned) {
			return 'this user is banned';
		}
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
	chanelRequest(@Context() context) {
		return this.userChanelService.findMyRequestChanels(context.req.userId);
	}


	@Query(() => [Chanel] , { name: 'myChanels' })
	findMyChanels(
		@Context() context,
		@Args("private_chan", { type: () => Boolean }) private_chan: boolean
	) {
	  return this.userChanelService.findMyChanels(context.req.userId, private_chan);
	}


	@Query(() => [UsersChanels], { name: 'ChannelMembers' })
	findMembers(@Args("channel_id", {type: () => Int}) channel_id: number){
		return this.userChanelService.findMembersOfChan(channel_id);
	}


	@Mutation(() => UsersChanels || [UsersChanels], {name: "deleteChanelUser"})
	async deleteChanelUser(@Args("key") key: UpdateChanelUserInput, @Context() context) {
		const userId = context.req.userId; // je recuperer l'id de la personne qui fait la requete

		if(key.user_id !== userId){
			const I_amAdmin = await this.userChanelService.isAdministrator(key.chanel_id, key.user_id);
			const he_is_Admin = await this.userChanelService.isAdministrator(key.chanel_id, userId);
			if (I_amAdmin || !he_is_Admin ) {
				return 'you don t have the permission'
			}
		}
		return this.userChanelService.delete(key, userId);
	}


	@Mutation(() => UsersChanels, {name: "updateChanelUser"})
	async updateChanelUser(@Args("key") key: UpdateChanelUserInput, @Context() context){
		
		const userId = context.req.userId; // je recuperer l'id de la personne qui fait la requete
		const isAdmin = await this.userChanelService.isAdministrator(key.chanel_id, userId);
		const he_is_Owner = await this.userChanelService.IsOwnerInChannel(key.user_id, key.chanel_id);

		if(!isAdmin || he_is_Owner){
			return 'you don t have the permission';
		}

		return this.userChanelService.update(key);
	}
	
	@Mutation(() => UsersChanels, {name: "updateChanelAdmin"})
	async updateChanelAdmin(@Args("key") key: UpdateChanelUserInput, @Context() context){

		const userId = context.req.userId; // je recuperer l'id de la personne qui fait la requete

		const isOwner = await this.userChanelService.IsOwnerInChannel(userId, key.chanel_id);
		if(!isOwner){
			return 'you don t have the permission';
		}
		return this.userChanelService.update(key);
	}
}
