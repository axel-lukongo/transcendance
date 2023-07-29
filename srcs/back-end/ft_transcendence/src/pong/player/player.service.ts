import { Injectable } from '@nestjs/common';
import { CreatePlayerInput } from './dto/create-player.input';
import { UpdatePlayerInput } from './dto/update-player.input';

import { PrismaService } from 'prisma/prisma.service';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayerService {

	constructor(private readonly prisma: PrismaService) {}

	async create(createPlayerInput: CreatePlayerInput) {
		const newPlayer =  this.prisma.player.create({
			data: createPlayerInput,
		  });
		  return newPlayer;
	};

  	findAll() {
    	return this.prisma.player.findMany();
  	}

   	findUnique(id: number) {
		return this.prisma.player.findUnique({
		where: {id },
	  });
	}

  	update(id: number, updatePlayerInput: UpdatePlayerInput) {
		return this.prisma.player.update({
		where: { id: id },
		data: updatePlayerInput,
		});  
	}

  	remove(id: number) {
		return this.prisma.player.delete({
		where: { id: id },
	  });  
	}

	findWaitingRoomPlayers(id: number) {
		return this.prisma.player.findMany({
			where : {waitingRoomId : id}
		})
	};
}
