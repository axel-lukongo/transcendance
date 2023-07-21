import { Injectable } from '@nestjs/common';
import { CreatePlayerInput, CreatePositionBallInput } from './dto/create-player.input';
import { UpdatePlayerInput, UpdatePositionBallInput } from './dto/update-player.input';

import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PlayerService {

	constructor(private readonly prisma: PrismaService) {}


  create(createPlayerInput: CreatePlayerInput) {
	return this.prisma.player.create({
		data: createPlayerInput,
	  });
	}

  findAll() {
    return this.prisma.player.findMany();
  }

  findUnique(id: number) {
    return this.prisma.player.findUnique({
		where: { id },
	  });
  }

  update(id: number, updatePositionPlayerInput: UpdatePlayerInput) {
	return this.prisma.player.update({
		where: { id: id },
		data: updatePositionPlayerInput,
	});  }

  remove(id: number) {
	return this.prisma.player.delete({
		where: { id: id },
	  });  
	}
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