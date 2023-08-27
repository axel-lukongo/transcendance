import { Injectable } from '@nestjs/common';
import { CreatePongInviteInput } from './dto/create-pong-invite.input';
import { UpdatePongInviteInput } from './dto/update-pong-invite.input';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PongInviteService {

  constructor(private readonly prisma: PrismaService) {}


  async setPongInvite(userId: number, friendId : number){

    let pongInvite = await this.findPongInvite(userId, friendId);
    if (!pongInvite)
    {
      const newRoom = await this.prisma.waitingRoom.create({});
       
      const createPongInviteInput : CreatePongInviteInput = {
        userId1 : userId,
        userId2 : friendId,
        waitingRoomId : newRoom.id
       }
       return await this.create(createPongInviteInput);
       
      }
    return pongInvite;
  }

  async create(createPongInviteInput: CreatePongInviteInput) {
    return this.prisma.pongInvite.create ({
      data: createPongInviteInput
    })
  }


  async findPongInvite(userId: number, friendId: number) {
    return this.prisma.pongInvite.findFirst({
      where: {
        OR: [
          { userId1: userId, userId2: friendId },
          { userId1: friendId, userId2: userId },
        ],
      },
    });
  }

  findPongInviteByWaitingRoomId(waitingRoomId: number) {
    return this.prisma.pongInvite.findUnique({
      where: {
        waitingRoomId: waitingRoomId
      },
    });
  }
  
  

  remove(id: number) {
    return this.prisma.pongInvite.delete({
      where: { id: id },
      });  
  }
}
