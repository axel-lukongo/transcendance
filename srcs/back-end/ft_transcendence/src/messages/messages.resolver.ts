import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, Subscription, Context } from '@nestjs/graphql';
import { Message } from './entities/messages.entity';
import { MessagesService } from './messages.service';
import { CreateMessageInput } from './dto/create-messages.input';
import { UpdateChanelInput } from 'src/chanel/dto/update-chanel.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();
const NEW_MSG = 'addMessage';

@Resolver(() => Message)
export class MessagesResolver {
	constructor( private readonly msgService: MessagesService) { }

	@Query(() => [Message], { name: 'Message_findAll_msg' })
	findAll_msg() {
		return this.msgService.findAll_msg();
	}


	@Query(() => [Message], { name: 'Message_findAll_msg_chan' })
	findAll_msg_chan(@Args('channelId', { type: () => Int }) channelId: number) {
	  return this.msgService.findAll_msg_chan(channelId);
	}

	@Query(() => Message, { name: 'Message_findOne_msg' })
	findOne_msg(@Args('id', { type: () => Int }) id: number) {
		return this.msgService.findOne_msg(id);
	}



	@Mutation(() => Message)
	async createMessage(@Args('createMsgInput') createMsgInput: CreateMessageInput, @Context() context) {

		const userId = context.req.userId; // je recuperer l'id de la personne qui fait la requete
		const isMuted = await this.msgService.isUserMutedInChannel(userId, createMsgInput.channel_id);

		if (isMuted === true) {
			return (' you are muted');
		}
		// console.log('je passe ici', isMuted)
		
		const new_message = this.msgService.create(createMsgInput);
		// console.log(" c'est ici ====>>> ", new_message)
		pubSub.publish(NEW_MSG, {
			addmessage: new_message,
		});
		return new_message;
	}



	@Mutation(() => Message)
	updateMessage(@Args("updateMsgInput") MsgInput: UpdateMessageInput) {
		return this.msgService.update(MsgInput.id, MsgInput);
	}

	@Mutation(() => Message)
	deleteMessage(id: number) {
		return this.msgService.delete(id);
	}


	/**
	 * j'ai rajouter un filtre dans les souscription afin que les message puissent etre envoyer
	  uniquement a des chanels qui seront specifier au moment de la creation, 
	 * payload: il contiendras les donnees qui auront ete cree lors de la mutation
	 * variables: il contiendras l'id du chanel dont je veux recevoir les messages
	 * resolvedPayload.channel_id === variables.channel_id: si channel_id cree lors de la mutation
	  correspond a channel_id qui se trouve dans ma variable alors je pourrais executer addmessages sinon je l'ignore
	 */
	@Subscription(() => Message, {
	filter: async (payload, variables) => {
		const resolvedPayload = await payload.addmessage;
		return resolvedPayload.channel_id === variables.channel_id;
		}
	})
	addmessage(@Args('channel_id', { type: () => Int }) channel_id: number) {
		return pubSub.asyncIterator(NEW_MSG);
	}
}
