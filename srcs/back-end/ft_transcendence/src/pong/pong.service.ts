import { Injectable } from '@nestjs/common';
import { CreatePongInput } from './dto/create-pong.input';
import { UpdatePongInput } from './dto/update-pong.input';
import { PrismaService } from 'prisma/prisma.service';
import { PlayerResolver } from './player/player.resolver';
import { UpdatePlayerInput } from './player/dto/update-player.input';

@Injectable()
export class PongService {
  constructor(private readonly prisma: PrismaService,
              private readonly player: PlayerResolver) {}

  async create(createPongInput: CreatePongInput) {
    return this.prisma.$transaction(async (prisma) => {
      
      const { playerId1, playerId2, ...dataWithoutPlayerIds } = createPongInput;
      const pong = await prisma.pong.create({
        data: dataWithoutPlayerIds
      });
  
      const newWaitingRoom = await prisma.waitingRoom.create({});
  
        const playerData : UpdatePlayerInput ={
          id : createPongInput.userId1,
          waitingRoomId: newWaitingRoom.id,
          opponentPlayerId: createPongInput.playerId2,
        }
      const player = this.player.updatePlayer(playerData);

      const otherPlayerData : UpdatePlayerInput ={
        id : createPongInput.userId2,
        waitingRoomId: newWaitingRoom.id,
        opponentPlayerId: createPongInput.playerId1,
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
