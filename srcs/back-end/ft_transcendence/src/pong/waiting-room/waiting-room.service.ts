import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

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


  remove(id: number) {
    return `This action removes a #${id} waitingRoom`;
  }
}
