import { Injectable } from '@nestjs/common';
import { CreateChanelInput } from './dto/create-chanel.input';
import { UpdateChanelInput } from './dto/update-chanel.input';
import { PrismaClient, Chanel } from '@prisma/client';

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
  async update(id: number, data: UpdateChanelInput): Promise<Chanel> {
    return this.prisma.chanel.update({
      where: { id },
      data,
    });
  }
  
  remove(id: number) {
    return this.prisma.chanel.delete({where: {id: id}});
  }
}
