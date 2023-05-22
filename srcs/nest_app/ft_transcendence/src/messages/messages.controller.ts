import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { CreateMessageDto, UpdateMessageDto } from './dto/MessageDto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {

	constructor(private readonly msgServ: MessagesService) {}

	@Post('create')
	createMessage(messageDto: CreateMessageDto) {
		this.msgServ.createMessage(messageDto);
	}

	@Get(':id')
	async getMessage(@Param('id') id_search: number): Promise<any> {
		const msg = await this.msgServ.getMessage(id_search);
	}

	@Put(':id')
	updateMessage(@Param('id') id_search: number, @Body() msgDto: UpdateMessageDto): Promise<any> {
		return this.msgServ.updateMessage(id_search, msgDto);
	}

}
