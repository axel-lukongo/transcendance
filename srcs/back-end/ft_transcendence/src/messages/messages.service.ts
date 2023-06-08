import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateMessageInput } from './dto/create-messages.input';
import { UpdateChanelInput } from 'src/chanel/dto/update-chanel.input';
import { UpdateMessageInput } from './dto/update-message.input';

@Injectable()
export class MessagesService {
	constructor(private readonly prisma: PrismaService) {}

	create(createMsg: CreateMessageInput) {
		return this.prisma.message.create({ data: createMsg });
	}

	update(id: number, updateMsg: UpdateMessageInput) {
		return this.prisma.message.update({ 
			where: {id: id},
			data: updateMsg,
		 });
	}

	delete(id: number) {
		return this.prisma.message.delete({ where: { id: id } });
	}

}
