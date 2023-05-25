import { Controller, Post, Get, Delete, Patch, Param, Body, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { ChanelService } from './chanel.service';
// import { PrismaClient, Chanel } from '@prisma/client';
import { CreateChanelDto } from '../dto/chanel.dto'


@Controller('chanel')
export class ChanelController {
	constructor(private readonly chanelService: ChanelService) {}

	//get all chanels
	@Get()
	getchanels() {
		return this.chanelService.getchanels();
	}

	//get one chanels
	@Get(":id")
	getonechanels(@Param("id",ParseIntPipe) id: number) {
		try {
			return this.chanelService.getchanel(id);
		}
		catch (error) {
			throw new NotFoundException;
		}
	}

	@Post()
	createchanels(@Body() creatchanelDto: CreateChanelDto) {
		return this.chanelService.createchanel(creatchanelDto);
	}

	@Delete(":id")
    deletechanels(@Param("id") id: string) {
		return this.chanelService.deletechanel(+id);
	}
}
