import { Module } from '@nestjs/common';
import { PongService } from './pong.service';
import { PongResolver } from './pong.resolver';
import { PositionGameModule } from './position_game/position_game.module';

@Module({
  providers: [PongResolver, PongService],
  imports: [PositionGameModule]
})
export class PongModule {}
