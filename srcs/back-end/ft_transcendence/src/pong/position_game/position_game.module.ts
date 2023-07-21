import { Module } from '@nestjs/common';
import { PositionPlayerService, PositionBallService } from './position_game.service';
import { PositionPlayerResolver, PositionBallResolver } from './position_game.resolver';

@Module({
  providers: [PositionPlayerResolver, PositionBallResolver, PositionPlayerService, PositionBallService]
})
export class PositionGameModule {}
