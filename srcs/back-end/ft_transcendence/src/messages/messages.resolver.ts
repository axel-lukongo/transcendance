import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { Message } from './entities/messages.entity';
import { MessagesService } from './messages.service';
import { CreateMessageInput } from './dto/create-messages.input';
import { UpdateChanelInput } from 'src/chanel/dto/update-chanel.input';
import { UpdateMessageInput } from './dto/update-message.input';
// import { User } from 'src/users/entities/user.entity';

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
}
