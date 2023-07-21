import { Injectable } from '@nestjs/common';
import { CreatePongInput } from './dto/create-pong.input';
import { UpdatePongInput } from './dto/update-pong.input';

@Injectable()
export class PongService {
  create(createPongInput: CreatePongInput) {
    return 'This action adds a new pong';
  }

  findAll() {
    return `This action returns all pong`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pong`;
  }

  update(id: number, updatePongInput: UpdatePongInput) {
    return `This action updates a #${id} pong`;
  }

  remove(id: number) {
    return `This action removes a #${id} pong`;
  }
}
