import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CreateMessageDto, UpdateMessageDto } from '../dto/messages.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {

	constructor(private readonly msgServ: MessagesService) {}

	@Post('create')
	createMessage(messageDto: CreateMessageDto) {
		this.msgServ.createMessage(messageDto);
	}

	@Get(':id')
	async getMessage(@Param('id') id: string): Promise<any> {
		const search_id = parseInt(id, 10);
		const msg = await this.msgServ.getMessage(search_id);
		return msg;
	}
	
	@Put(':id')
	updateMessage(@Param('id') id: string, @Body() msgDto: UpdateMessageDto): Promise<any> {
		const search_id = parseInt(id, 10);
		return this.msgServ.updateMessage(search_id, msgDto);
	}
	
	@Delete(':id')
	deleteMessage(@Param('id') id: string) {
		const search_id = parseInt(id, 10);
		return this.msgServ.deleteMessage(search_id);
	}

}
