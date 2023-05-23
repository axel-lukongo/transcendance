import { Controller, Post, Get, Delete, Patch, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaClient, User } from '@prisma/client';
import { CreateUserDto } from '../dto/user.dto'

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    async createUser(@Body() userDto: CreateUserDto): Promise<User> {
      return this.userService.createUser(userDto);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: number): Promise<User | null> {
      return this.userService.deleteUser(id);
    }

    @Get(':nickname')
    async getUserByNickname(@Param('nickname') nick: string): Promise<User | null> {
      return this.userService.getUserByNickname(nick);
    }

    @Patch(':id/token')
    async updateUserToken(@Param('id') id: number, @Body() { token }: { token: number }): Promise<User | null> {
      return this.userService.updateUser(id, { token });
    }

    @Patch(':id/nickname')
    async updateUserNickname(@Param('id') id: number, @Body() { nickname }: { nickname: string }): Promise<User | null> {
      return this.userService.updateUser(id, { nickname });
    }

    @Patch(':id/nickname')
    async updateUserAvatarImg(@Param('id') id: number, @Body() { avatar }: { avatar: string }): Promise<User | null> {
      return this.userService.updateUser(id, { avatar });
    }
}
