import { Injectable } from '@nestjs/common';
import { CreatePongInput } from './dto/create-pong.input';
import { UpdatePongInput } from './dto/update-pong.input';
import { PrismaService } from 'prisma/prisma.service';
import { PlayerService } from './player/player.service';

@Injectable()
export class PongService {
  constructor(private readonly prisma: PrismaService,
              private readonly player: PlayerService) {}

  async create(createPongInput: CreatePongInput) {
     return this.prisma.$transaction(async (prisma) => {
       const newWaitingRoom = await prisma.waitingRoom.create({});
       console.log('waintiing room', newWaitingRoom.id);
       this.player.update(createPongInput.userId1, {id: createPongInput.userId1, waitingRoomId: newWaitingRoom.id});
       this.player.update(createPongInput.userId2, {id: createPongInput.userId2, waitingRoomId: newWaitingRoom.id});
       const newPong = await prisma.pong.create({
         data: createPongInput
       });
       return newPong;
     });
  }
  
  findAll() {
    return this.prisma.pong.findMany({});
  }

  findUnique (id : number ) {
    return this.prisma.pong.findUnique({ where : {id}})
  }

  async findMyOpponent(userId: number) {
    try {
      // Récupérer toutes les instances de la table Pong impliquant l'utilisateur
      const allPongsForUser = await this.prisma.pong.findMany({
        where: {
          OR: [
            { userId1: userId },
            { userId2: userId },
          ],
        },
        orderBy: {
          Versus_date: 'desc', // Trier par ordre décroissant de versusDate
        },
      });
  
      // Si la liste est vide, cela signifie qu'il n'y a pas d'instances de Pong pour l'utilisateur
      if (allPongsForUser.length === 0) {
        return null;
      }
  
      // Récupérer l'ID de l'autre joueur dans la dernière partie (Pong)
      const otherPlayerId = allPongsForUser[0].userId1 === userId ? allPongsForUser[0].userId2 : allPongsForUser[0].userId1;
  
      // Retourner le joueur correspondant à l'ID de l'autre joueur
      const currentOpponnent = await this.player.findUnique(otherPlayerId);
      console.log(currentOpponnent);
      return currentOpponnent;
    } catch (error) {
      console.error('Error finding opponent:', error);
      throw error;
    }
  }
  
  

  update(id: number, updatePongInput: UpdatePongInput) {
    return `This action updates a #${id} pong`;
  }

  remove(id: number) {
    return `This action removes a #${id} pong`;
  }
}
