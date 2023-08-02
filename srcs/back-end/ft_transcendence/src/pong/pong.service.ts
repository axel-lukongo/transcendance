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
  constructor(private readonly prisma: PrismaService,
              private readonly player: PlayerResolver,
              private readonly ball: BallResolver,
              private readonly waitingRoom: WaitingRoomResolver) {}

  async create(createPongInput: CreatePongInput) {
    return this.prisma.$transaction(async (prisma) => {
      
      // Nouvelle instance de pong
      const { playerId1, playerId2, ...dataWithoutPlayerIds } = createPongInput;
      const pong = await prisma.pong.create({
        data: dataWithoutPlayerIds
      });
  
      //Nouvelle instance de la waintingRoom des Players
      const newWaitingRoom = await this.waitingRoom.createWaitingRoom();

      //Nouvelle instance d'un balle pour le Pong 
      const newBall = await this.ball.createBall();
  
      const playerData : UpdatePlayerInput ={
        id : createPongInput.userId1,
        host : true,
        opponentPlayerId: playerId2,
        waitingRoomId: newWaitingRoom.id,
        ballId: newBall.id,
        pongId: pong.id,
      }
      this.player.updatePlayer(playerData);

      const otherPlayerData : UpdatePlayerInput ={
        id : createPongInput.userId2,
        opponentPlayerId: playerId1,
        waitingRoomId: newWaitingRoom.id,
        ballId: newBall.id,
        pongId: pong.id,
      }
      this.player.updatePlayer(otherPlayerData);

      return pong;
    });
  }
  
  findAll() {
    return this.prisma.pong.findMany({});
  }

  findUnique (id : number ) {
    return this.prisma.pong.findUnique({ where : {id}})
  }

  async findGame(userId: number) {
    try {
      const games = await this.prisma.pong.findMany({
        where: {
          OR: [
            { userId1: userId },
            { userId2: userId },
          ],
        },
        orderBy: {
          versusDate: 'desc', // Tri par date en ordre décroissant
        },
      });
      if (games.length === 0) {
        throw new Error('No game found for the given userId.');
      }
      return games[0];
    } 
    catch (error) {
      throw new Error(`Error fetching game: ${error.message}`);
    }
  }
  update(id: number, updatePongInput: UpdatePongInput) {
    return `This action updates a #${id} pong`;
  }

  remove(id: number) {
    return `This action removes a #${id} pong`;
  }
}
