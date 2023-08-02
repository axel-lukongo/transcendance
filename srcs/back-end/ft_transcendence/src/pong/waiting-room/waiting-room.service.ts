import { Injectable } from '@nestjs/common';
import { UpdateWaitingRoomInput } from './dto/update-waiting-room.input';

import { PrismaService } from 'prisma/prisma.service';
import { Player } from '../player/entities/player.entity';

@Injectable()
export class WaitingRoomService {

  constructor(private readonly prisma: PrismaService) {}

  create() {
    return this.prisma.waitingRoom.create ({});
  }

  findAll() {
    return this.prisma.waitingRoom.findMany();
  }

  findUnique(id: number) {
    return this.prisma.waitingRoom.findUnique({
      where: { id },
    })
  }

  update(id: number, player: Player) {
    // return this.prisma.waitingRoom.update({
    // where: { id: id },
    // data: { waitingList: { connect: { id: player.id } } },
    // include: { waitingList: true }
    // });
  }


  remove(id: number) {
    return `This action removes a #${id} waitingRoom`;
  }
}
