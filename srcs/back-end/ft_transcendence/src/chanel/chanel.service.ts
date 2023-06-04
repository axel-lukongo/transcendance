import { Injectable } from '@nestjs/common';
import { CreateChanelInput } from './dto/create-chanel.input';
import { UpdateChanelInput } from './dto/update-chanel.input';
import { PrismaService } from 'prisma/prisma.service';
import { Chanel } from './entities/chanel.entity';

@Injectable()
export class ChanelService {
	constructor(private readonly prisma: PrismaService) {}

  async create(createChanelInput: CreateChanelInput) {
    return this.prisma.chanel.create({
		data: createChanelInput
	})
  }

  async findAll(): Promise<Chanel[]> { 
	return this.prisma.chanel.findMany({});
  }

  async findOne(id: number): Promise<Chanel> {
    return this.prisma.chanel.findUnique({where: {id: id}});
  }
  async update(id: number, data: UpdateChanelInput): Promise<Chanel> {
    return this.prisma.chanel.update({
      where: { id },
      data,
    });
  }
  
  async remove(id: number) {
    return this.prisma.chanel.delete({where: {id: id}});
  }
}
