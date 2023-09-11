import { Injectable } from '@nestjs/common';
import { CreateToblocInput } from './dto/create-tobloc.input';
import { UpdateToblocInput } from './dto/update-tobloc.input';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ToblocService {
	constructor(private readonly prisma: PrismaService) {}

async findAll(id: number){ 
	return this.prisma.toBloc.findMany({where: {blocker_id: id},
	include: { blocked: true }
	});
}

  async findOne(id: number) {
	return this.prisma.toBloc.findUnique({where: {id: id}});
}


create(bloc: CreateToblocInput) {
	return this.prisma.toBloc.create({ data: bloc });
}


remove(id: number) {
	return this.prisma.toBloc.delete({ where: { id: id } });
}

async is_blocked(blockerId: number, blockedId: number){
	const user_is_blocked = await this.prisma.toBloc.findFirst({
		where: {
			blocker_id: blockerId,
			blocked_id: blockedId,
		},
	  });
	  if (user_is_blocked)
	  	return true;
	  else
	  	return false;
	}


async YourBloc(blockerId: number, blockedId: number){
	return await this.prisma.toBloc.findFirst({
		where: {
		  OR: [
			{
				blocker_id: blockerId,
				blocked_id: blockedId,
			},
			{
				blocker_id: blockedId,
				blocked_id: blockerId,
			},
		  ],
		},
	  });}
}



