import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { PongInviteService } from './pong-invite.service';
import { PongInvite } from './entities/pong-invite.entity';
import { CreatePongInviteInput } from './dto/create-pong-invite.input';

@Resolver(() => PongInvite)
export class PongInviteResolver {
  constructor(private readonly pongInviteService: PongInviteService) {}


  @Mutation(() => PongInvite)
  async setPongInvite(@Args('friendId', { type: () => Int }) friendId: number
  ,@Context() context : any, )
  {
    return  await this.pongInviteService.setPongInvite(context.req.userId, friendId);
  }


  async findPongInviteByWaitingRoomId(waitingRoomId: number) {
    return this.pongInviteService.findPongInviteByWaitingRoomId(waitingRoomId);
  }

  @Mutation(() => PongInvite)
  removePongInvite(@Args('id', { type: () => Int }) id: number) {
    return this.pongInviteService.remove(id);
  }
}
