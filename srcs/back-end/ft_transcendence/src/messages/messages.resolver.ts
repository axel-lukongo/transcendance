import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, Subscription } from '@nestjs/graphql';
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

	@Query(() => Message, { name: 'Message_findOne_msg' })
	findOne_msg(@Args('id', { type: () => Int }) id: number) {
		return this.msgService.findOne_msg(id);
	}

	@Mutation(() => Message)
	createMessage(@Args('createMsgInput') createMsgInput: CreateMessageInput) {
		const new_message = this.msgService.create(createMsgInput);
		pubSub.publish(NEW_MSG, {
			addmessage: new_message,
		});
		return this.msgService.create(createMsgInput);
	}

	@Mutation(() => Message)
	updateMessage(@Args("updateMsgInput") MsgInput: UpdateMessageInput) {
		return this.msgService.update(MsgInput.id, MsgInput);
	}

	@Mutation(() => Message)
	deleteMessage(id: number) {
		return this.msgService.delete(id);
	}

	@Subscription(() => Message)
	addmessage(){
	  return pubSub.asyncIterator(NEW_MSG);
	}
}
