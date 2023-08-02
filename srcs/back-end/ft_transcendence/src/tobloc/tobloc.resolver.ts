import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ToblocService } from './tobloc.service';
import { Tobloc } from './entities/tobloc.entity';
import { CreateToblocInput } from './dto/create-tobloc.input';
import { UpdateToblocInput } from './dto/update-tobloc.input';
import { ChanelService } from 'src/chanel/chanel.service';
@Resolver(() => Tobloc)
export class ToblocResolver {
  constructor(private readonly toblocService: ToblocService,
	private readonly chanelService: ChanelService) {}

//   @Mutation(() => Tobloc)
//   createTobloc(@Args('createToblocInput') createToblocInput: CreateToblocInput) {
//     return this.toblocService.create(createToblocInput);
//   }

@Mutation(() => Tobloc)
async createToBloc(
  @Args('blockerId', { type: () => Int }) blockerId: number,
  @Args('blockedId', { type: () => Int }) blockedId: number,
) {
  const createToblocInput: CreateToblocInput = {
    blocker_id: blockerId,
    blocked_id: blockedId,
  };

  // Créer un nouvel enregistrement dans la table Tobloc
  const newToBloc = await this.toblocService.create(createToblocInput);

  // Appeler la mutation removeDirectMsg avec les IDs des utilisateurs
  await this.chanelService.removeDirectMsg(blockerId, blockedId);

  return newToBloc;
}


  @Query(() => [Tobloc], { name: 'tobloc' })
  findAll() {
    return this.toblocService.findAll();
  }

  @Query(() => Tobloc, { name: 'tobloc' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.toblocService.findOne(id);
  }



  @Mutation(() => Tobloc)
  removeTobloc(@Args('id', { type: () => Int }) id: number) {
    return this.toblocService.remove(id);
  }
}
