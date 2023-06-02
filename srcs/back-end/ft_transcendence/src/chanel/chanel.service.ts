import { Injectable } from '@nestjs/common';
import { CreateChanelInput } from './dto/create-chanel.input';
import { UpdateChanelInput } from './dto/update-chanel.input';
import { PrismaClient, Chanel } from '@prisma/client';
// import { Chanel } from './entities/chanel.entity';
@Injectable()
export class ChanelService {
	constructor(private readonly prisma: PrismaClient) {}

  create(createChanelInput: CreateChanelInput) {
    return this.prisma.chanel.create({
		data: createChanelInput
	})
  }

  findAll(): Promise<Chanel[]> { 
	return this.prisma.chanel.findMany({});
  }

  findOne(id: number): Promise<Chanel> {
    return this.prisma.chanel.findUnique({where: {id: id}});
  }

//   update(id: number, updateChanelInput: UpdateChanelInput) {
//     return `This action updates a #${id} chanel`;
//   }

  remove(id: number) {
    return this.prisma.chanel.delete({where: {id: id}});
  }
}
