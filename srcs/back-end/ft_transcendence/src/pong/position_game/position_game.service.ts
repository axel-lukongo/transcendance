import { Injectable } from '@nestjs/common';
import { CreatePositionPlayerInput } from './dto/create-position_game.input';
import { UpdatePositionPlayerInput } from './dto/update-position_game.input';
import { CreatePositionBallInput } from './dto/create-position_game.input';
import { UpdatePositionBallInput } from './dto/update-position_game.input';

import { PrismaService } from 'prisma/prisma.service';
// import { PositionPlayer } from './entities/position_game.entity';
// import { PositionBall } from './entities/position_game.entity';


@Injectable()
export class PositionPlayerService {

	constructor(private readonly prisma: PrismaService) {}


  create(createPositionPlayerInput: CreatePositionPlayerInput) {
	return this.prisma.positionPlayer.create({
		data: createPositionPlayerInput,
	  });
	}

  findAll() {
    return this.prisma.positionPlayer.findMany();
  }

  findOne(id: number) {
    return this.prisma.positionPlayer.findUnique({
		where: { id },
	  });
  }

  update(id: number, updatePositionPlayerInput: UpdatePositionPlayerInput) {
	return this.prisma.positionPlayer.update({
		where: { id: id },
		data: updatePositionPlayerInput,
	});  }

  remove(id: number) {
	return this.prisma.positionPlayer.delete({
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