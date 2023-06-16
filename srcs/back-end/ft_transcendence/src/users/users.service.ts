import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'prisma/prisma.service';
import { LoginUserInput } from './dto/login-user.input';
import * as bcrypt from 'bcrypt';
import { CreateContactInput } from '../contacts/dto/create-contact.input';
import { Contact } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  
  create(createUserInput: CreateUserInput) {
    return this.prisma.user.create({
      data: createUserInput
    })
  }

  async login(loginUserInput: LoginUserInput) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: loginUserInput.email,
      },
    });

    if (!user || !bcrypt.compareSync(loginUserInput.password, user.password)) {
      throw new Error('Invalid login input');
    }

    return user;
  }
  findAll() {
    return this.prisma.user.findMany({});
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({where: {id: id}});
  }

  update(id: number, data: UpdateUserInput) {
    return this.prisma.user.update({
      where: { id },
      data
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({where: {id: id}});
  }

}
