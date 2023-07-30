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
      
      const { playerId1, playerId2, ...dataWithoutPlayerIds } = createPongInput;
      await prisma.pong.create({
        data: dataWithoutPlayerIds
      });
  
      const newWaitingRoom = await this.waitingRoom.createWaitingRoom();
      const newBall = await this.ball.createBall();
  
        const playerData : UpdatePlayerInput ={
          id : createPongInput.userId1,
          opponentPlayerId: createPongInput.playerId2,
          waitingRoomId: newWaitingRoom.id,
          ballId: newBall.id,
        }
      const player = this.player.updatePlayer(playerData);

      const otherPlayerData : UpdatePlayerInput ={
        id : createPongInput.userId2,
        opponentPlayerId: createPongInput.playerId1,
        waitingRoomId: newWaitingRoom.id,
        ballId: newBall.id,
      }
    const otherPlayer = this.player.updatePlayer(otherPlayerData);
      
  
      return [player, otherPlayer];
    });
  }
  
  findAll() {
    return this.prisma.pong.findMany({});
  }

  findUnique (id : number ) {
    return this.prisma.pong.findUnique({ where : {id}})
  }

  update(id: number, updatePongInput: UpdatePongInput) {
    return `This action updates a #${id} pong`;
  }

  remove(id: number) {
    return `This action removes a #${id} pong`;
  }
}
