import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, Subscription } from '@nestjs/graphql';
import { ChanelService } from './chanel.service';
import { Chanel } from './entities/chanel.entity';
import { CreateChanelInput } from './dto/create-chanel.input';
import { UpdateChanelInput } from './dto/update-chanel.input';
import { UsersChanels } from '../user-chanels/entities/user_chanel.entity';
import { AddUserChanel } from '../user-chanels/dto/add-user-chanel.input';
import { Message } from 'src/messages/entities/messages.entity';
import { MessagesResolver } from '../messages/messages.resolver';
import { CreateMessageInput } from '../messages/dto/create-messages.input';
import { PubSub } from 'graphql-subscriptions';


// const pubSub = new PubSub();
// const NEW_MSG = 'addMessage';

@Resolver(() => Chanel)
export class ChanelResolver {
  constructor(private readonly chanelService: ChanelService,
	private readonly messagesResolver: MessagesResolver
	) {}

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
  
  @ResolveField(() => [Message])
  async messages(@Parent() chanel: Chanel) {
    return this.messagesResolver.findAll_msg(); // Utilisez la méthode appropriée pour récupérer les messages associés au canal à partir de MessagesResolver
  }

  @Query(() => Chanel, { name: 'getChannelByOwnersAndInterlocutor' })
  async getChannelByOwnersAndInterlocutor(
	  @Args('userId1', { type: () => Int }) userId1: number,
	  @Args('userId2', { type: () => Int }) userId2: number,
	  ) {
	return this.chanelService.getChannelByOwnersAndInterlocutor(userId1, userId2);
  }


  @Mutation(() => Chanel, { name: 'removeDirectMsg' })
  async removeDirectMsg(
	  @Args('userId1', { type: () => Int }) userId1: number,
	  @Args('userId2', { type: () => Int }) userId2: number,
	  ) {
	return this.chanelService.removeDirectMsg(userId1, userId2);
  }
}
