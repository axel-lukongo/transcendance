import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'prisma/prisma.service';
import { LoginUserInput } from './dto/login-user.input';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  
  create(createUserInput: CreateUserInput) {
    return this.prisma.user.create({
      data: createUserInput
    })
  }

  login(loginUserInput : LoginUserInput) {
    return this.prisma.user.findFirst({
      where: {
        email: loginUserInput.email,
        password: loginUserInput.password
      },
    });
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
