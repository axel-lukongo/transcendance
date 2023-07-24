import { Injectable } from '@nestjs/common';
import { CreatePlayerInput, CreatePositionBallInput } from './dto/create-player.input';
import { UpdatePlayerInput, UpdatePositionBallInput } from './dto/update-player.input';

import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PlayerService {

	constructor(private readonly prisma: PrismaService) {}

	async create(createPlayerInput: CreatePlayerInput) {
		const newPlayer =  this.prisma.player.create({
			data: createPlayerInput,
		  });
	  
		  // Check if the player has a valid waitingRoomId
		//   if (createPlayerInput.waitingRoomId) {
		// 	// Connect the newly created Player to the waitingList of the associated WaitingRoom
		// 	 this.prisma.waitingRoom.update({
		// 	  where: { id: createPlayerInput.waitingRoomId },
		// 	  data: {
		// 		waitingList: {
		// 		  connect: {
		// 			id: (await newPlayer).id
		// 		  },
		// 		},
		// 	  },
		// 	});
		//   }
	  
		  return newPlayer;
	};

  	findAll() {
    	return this.prisma.player.findMany();
  	}

   	findUnique(id: number) {
		return this.prisma.player.findUnique({
		where: {id },
		include : {waitingRoom: true}
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

	findWaitingRoomPlayer(id: number) {
		return this.prisma.player.findMany({
			where : {waitingRoomId : id}
		})
	};
}

@Injectable()
export class PositionBallService{
	constructor(private readonly prisma: PrismaService) {}

	create(createPositionBallInput: CreatePositionBallInput) {
		return this.prisma.positionBall.create({
			data: createPositionBallInput,
			});
	}

	findAll() {
		return this.prisma.positionBall.findMany();
	}

	findOne(id: number) {
		return this.prisma.positionBall.findUnique({
			where: { id },
	});
	}

	update(id: number, updatePositionBallInput: UpdatePositionBallInput) {
		return this.prisma.positionBall.update({
			where: { id: id },
			data: updatePositionBallInput,
	});  }

		remove(id: number) {
	return this.prisma.positionBall.delete({
			where: { id: id },
	});
	}
}