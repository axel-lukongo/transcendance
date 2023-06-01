import { Injectable } from '@nestjs/common';
import { CreateChanelInput } from './dto/create-chanel.input';
import { UpdateChanelInput } from './dto/update-chanel.input';
import { PrismaClient } from '@prisma/client';
import { Chanel } from './entities/chanel.entity';
@Injectable()
export class ChanelService {
	constructor(private readonly prisma: PrismaClient) {}

  create(createChanelInput: CreateChanelInput) {
    return 'This action adds a new chanel';
  }

  findAll() {
    return `This action returns all chanel`;
  }

  findOne(id: number): Promise<Chanel> {
    return this.prisma.chanel.findOne({id: id});
  }

  update(id: number, updateChanelInput: UpdateChanelInput) {
    return `This action updates a #${id} chanel`;
  }

  remove(id: number) {
    return `This action removes a #${id} chanel`;
  }
}
