import { Injectable } from '@nestjs/common';
import { UpdateBallInput } from './dto/update-ball.input';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class BallService {

  constructor(private readonly prisma : PrismaService){}
  create() {
    return this.prisma.ball.create({});
  }

  findAll() {
    return this.prisma.ball.findMany({});
  }

  findUnique(id: number) {
		return this.prisma.ball.findUnique({where: {id: id}});
  }

  update(id: number, updateBallInput: UpdateBallInput) {
    return this.prisma.ball.update({
      where: { id: id },
      data: updateBallInput,
      }); 
  }

  remove(id: number) {
		return this.prisma.ball.delete({
		where: { id: id },
	  });
	}
}
