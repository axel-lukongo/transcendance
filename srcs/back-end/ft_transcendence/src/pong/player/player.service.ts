import { Injectable } from '@nestjs/common';
import { CreatePlayerInput, CreatePositionBallInput } from './dto/create-player.input';
import { UpdatePlayerInput, UpdatePositionBallInput } from './dto/update-player.input';

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
		// include : {waitingRoom: true}
	  });
	}

	async findMyGame(userId: number) {
		try {
		  // Récupérer toutes les instances de la table Pong impliquant l'utilisateur
		  const pong =  this.prisma.pong.findFirst({
			where: {
				userId2: userId,
			},
			// orderBy: {
			//   Versus_date: 'desc', // Trier par ordre décroissant de versusDate
			// },
		  });
	  
		  // Si la liste est vide, cela signifie qu'il n'y a pas d'instances de Pong pour l'utilisateur
		  if (!pong) {
			console.log('rien')
			return null;
		  }
	  
		  // Récupérer l'ID de l'autre joueur dans la dernière partie (Pong)
		  const otherPlayerId = (await pong).userId1 === userId ? 
		  	(await pong).userId2 
			: 
			(await pong).userId1;
	  
		  // Retourner le joueur correspondant à l'ID de l'autre joueur
		  return this.findUnique(otherPlayerId);
		} catch (error) {
		  console.error('Error finding opponent:', error);
		  throw error;
		}
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