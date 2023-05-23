import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateMessageDto, UpdateMessageDto } from '../dto/messages.dto';
import { error } from 'console';

@Injectable()
export class MessagesService {
	
	constructor(private readonly prisma: PrismaClient) {}

	async createMessage(msgDto: CreateMessageDto): Promise<any> {
		return this.prisma.message.create({ data: msgDto  });

	}

	async updateMessage(search_id: number, msgDto: UpdateMessageDto): Promise<any> {
		return 	this.prisma.message.update({ 
			where: { id: search_id },
			data:  msgDto 
		});
	}

	getMessage(search_id: number): Promise<any> {
		return this.prisma.message.findUnique({ where: { id: search_id }});
	}

	async deleteMessage(search_id: number): Promise<any> {
		return this.prisma.message.delete({ where: {id: search_id }});
	}
}
