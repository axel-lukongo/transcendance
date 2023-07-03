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




/** ici je vais cree une mutation pour cree un message en etant dans un chanel.
 * je vais ensuite y mettre une subscription afin de surveiller les messages qui seront cree via le chanel
 * et dans mon front j'aurais un abonnement qui m'affichera tous les messages de un chanel specifique
 */
//   @Mutation(() => [Message])
//   async createMessageChan(
// 	@Args('chanelId', { type: () => Int }) chanelId: number,
// 	@Args('createMessageInput') createMessageInput: CreateMessageInput) {
// 	const new_msg = this.messagesResolver.createMessage(createMessageInput);
// 	pubSub.publish(NEW_MSG, {
// 		AddMessageChan: new_msg,
// 	});
//     return new_msg; 
//   } 


// @Subscription(() => Message)
// 	AddMessageChan(){
// 	  return pubSub.asyncIterator(NEW_MSG);
// 	}


}
