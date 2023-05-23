import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prsm: PrismaClient) {}

  async createUser(userDto: CreateUserDto): Promise<User> {
    return this.prsm.user.create({ data: userDto });
  }

  async deleteUser(id: number): Promise<User | null> {
    return this.prsm.user.delete({ where: { id } });
  }

  async getUserByNickname(nick: string): Promise<User | null> {
    return this.prsm.user.findUnique({ where: { nickname: nick } });
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User | null> {
    return this.prsm.user.update({ where: { id }, data: userData });
  }
}