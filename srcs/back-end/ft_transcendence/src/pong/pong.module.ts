import { Module } from '@nestjs/common';
import { PongService } from './pong.service';
import { PongResolver } from './pong.resolver';
import { GameModule } from './player/player.module';

@Module({
  providers: [PongResolver, PongService],
  imports: [GameModule]
})
export class PongModule {}
