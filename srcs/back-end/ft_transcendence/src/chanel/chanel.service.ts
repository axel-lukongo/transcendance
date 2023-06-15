import { Injectable } from '@nestjs/common';
import { CreateChanelInput } from './dto/create-chanel.input';
import { UpdateChanelInput } from './dto/update-chanel.input';
import { PrismaService } from 'prisma/prisma.service';
import { Chanel } from './entities/chanel.entity';
import { UsersService } from 'src/users/users.service';
import { AddUserChanel } from './dto/add-user-chanel.input';

@Injectable()
export class ChanelService {
	constructor(private readonly prisma: PrismaService, user: UsersService) {}

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

  async addUser(input: AddUserChanel) {
	return this.prisma.users_Chanels.create({
		data : {
			user: { connect: { id: input.user_id } },
			chanel: { connect: { id: input.chanel_id } }
		}
	})
  }
}
