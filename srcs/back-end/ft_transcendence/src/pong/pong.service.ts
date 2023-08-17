import { Injectable } from '@nestjs/common';
import { CreatePongInput } from './dto/create-pong.input';
import { UpdatePongInput } from './dto/update-pong.input';
import { PrismaService } from 'prisma/prisma.service';
import { PlayerResolver } from './player/player.resolver';
import { UpdatePlayerInput } from './player/dto/update-player.input';
import { BallResolver } from './ball/ball.resolver';
import { WaitingRoomResolver } from './waiting-room/waiting-room.resolver';

@Injectable()
export class PongService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPongInput: CreatePongInput) {
      return this.prisma.pong.create({
        data: createPongInput
      });
  }
  
  findAll() {
    return this.prisma.pong.findMany({});
  }

  findUnique (id : number ) {
    return this.prisma.pong.findUnique({ where : {id}})
  }

  async myHistoryMatch(userId: number) {
    try {
      const games = await this.prisma.pong.findMany({
        where: {
          OR: [
            { userId1: userId },
            { userId2: userId },
          ],
        },
        include: {
          user1: true,
          user2: true,
        },
      });
  
      if (games.length === 0) {
        throw new Error('No game found for the given userId.');
      }
  
      return games;
    } catch (error) {
      throw new Error(`Error fetching game: ${error.message}`);
    }
  }
  

  update(id: number, updatePongInput: UpdatePongInput) {
    return this.prisma.pong.update({
      where : {id},
      data : updatePongInput
    })
  }

  remove(id: number) {
    return `This action removes a #${id} pong`;
  }
}
