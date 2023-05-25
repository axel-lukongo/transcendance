import { Injectable } from '@nestjs/common';
import { PrismaClient, Chanel } from '@prisma/client';
import { CreateChanelDto } from '../dto/chanel.dto'

@Injectable()
export class ChanelService {
	constructor (private readonly prisma: PrismaClient) {};

	getchanels() {
		return this.prisma.chanel.findMany();
	}
	

	getchanel(search_id: number) {
		return this.prisma.chanel.findUnique({ where: {id: search_id} });
	}

	async createchanel(creatchanelDto: CreateChanelDto): Promise<any> {
		return this.prisma.chanel.create({
			data: creatchanelDto
		});
	}

	deletechanel(search_id: number) {
		return this.prisma.chanel.delete({where: {id: search_id}});
	}

}
