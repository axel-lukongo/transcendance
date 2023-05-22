import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateMessageDto, UpdateMessageDto } from '../dto/messages.dto';
import { error } from 'console';

@Injectable()
export class MessagesService {
	
	constructor(private readonly prisma: PrismaClient) {}

	async createMessage(msgDto: CreateMessageDto): Promise<any> {
		return new Promise ((resolve, reject) =>{
			this.prisma.message.create({ data: { msgDto } })
			.then((result) => {
				resolve(result);
			})
			.catch((error) => {
				reject(error);
			})
		})
	}

	async updateMessage(search_id: number, msgDto: UpdateMessageDto): Promise<any> {
		return new Promise ((resolve, reject) => {
			this.prisma.message.update({ 
				where: { search_id },
				data: { msgDto }
			})
			.then((result) => {
				resolve(result);
			})
			.catch((error) => {
				reject(error);
			})
		})
	}

	getMessage(search_id: number): Promise<any> {
		return new Promise ((reject, resolve) => {
			this.prisma.message.findUnique({ where: { id: search_id }})
			.then((result) => {
				resolve(result);
			})
			.catch((error) => {
				reject(error);
			})
		})
	}

	async deleteMessage(search_id: number): Promise<any> {
		return new Promise ((resolve, reject) => {
			this.prisma.message.delete({ where: {id: search_id }})
			.then((result) => {
				resolve(result);
			})
			.catch((error) => {
				reject(error);
			})
		})
	}
}
