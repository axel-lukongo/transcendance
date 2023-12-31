import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { ToblocService } from './tobloc.service';
import { Tobloc } from './entities/tobloc.entity';
import { CreateToblocInput } from './dto/create-tobloc.input';
import { UpdateToblocInput } from './dto/update-tobloc.input';
import { ChanelService } from 'src/chanel/chanel.service';
import { ContactsService } from 'src/contacts/contacts.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
@Resolver(() => Tobloc)
export class ToblocResolver {
  constructor(private readonly toblocService: ToblocService,
	private readonly chanelService: ChanelService,
	private readonly contactService: ContactsService,
	private readonly usersService: UsersService) {}

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

  // we creat a new Tobloc table
  const newToBloc = await this.toblocService.create(createToblocInput);
  // we delete all discussion between them 
  await this.chanelService.removeDirectMsg(blockerId, blockedId);
  //we delete them of the friend list
  await this.contactService.deleteContact(blockerId, blockedId);
  return newToBloc;
}



  @Query(() => [Tobloc], { name: 'person_blocked' })
  findAll( @Args('id', {type: () => Int}) id: number) {
    return this.toblocService.findAll(id);
  }



  @Query(() => Tobloc, { name: 'tobloc' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.toblocService.findOne(id);
  }


  @Query(() => Tobloc, { name: 'IsBlocked' })
  async UserBlocked(@Args('other_userId', { type: () => Int }) other_userId: number, @Context() context) {
    return await this.toblocService.YourBloc(context.req.userId, other_userId);
  }
  

//   @Query(() => User, { name: 'findUserById' })
//   findUserById(@Args('id', { type: () => Int }) id: number) {
//     return this.usersService.findUserById(id);
//   }


  @Mutation(() => Tobloc)
  removeTobloc(@Args('id', { type: () => Int }) id: number) {
    return this.toblocService.remove(id);
  }
}
