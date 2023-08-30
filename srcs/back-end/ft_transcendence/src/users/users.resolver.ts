import { Resolver, Query, Mutation, Args, Int, Context} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { socket } from 'src/main';


export const CHANGE_STATE = 'changeState';


@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'findAllUsers' })
  findAllUsers(@Context() context: any) {
    return this.usersService.findAll();
  }

  // @Query(() => User, { name: 'myInfo' })
  // myInfo(@Context() context: any) {

  //   return this.usersService.findUserById(context.req.userId);
  // }

  @Query(() => User, { name: 'findUserById' })
  findUserById(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findUserById(id);
  }

  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {

    const updateUser = await this.usersService.update(updateUserInput.id, updateUserInput);
    socket.publish(CHANGE_STATE, {
      changeState: updateUser
    });

    return updateUser;

  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }

  @Query(() => [User])
  searchUsers(
    @Args("research", { type: () => String}) research: string,
    @Context() context
  ) {
    return this.usersService.researchUsers(research, context.req.userId);
  }

  @Query(() => [User], {name: "searchUserForChan"})
  searchUserForChanel(
    @Args("chanel_id", { type: () => Int }) chanel_id: number,
    @Context() context
  ) {
    return this.usersService.researchUsersForAddChanel(context.req.userId, chanel_id);
  }

  @Mutation(() => User, {name: "updateState"})
  async updateState(
    @Args("new_state", { type: () => Int }) new_state: number,
    @Context() context: any
  ) {
    if (new_state < 1 || new_state > 4)
    {
      throw new Error("Unrecognized state");
    }
    const updateUserDataInput: UpdateUserInput = {
      id:  context.req.userId,
      state: new_state
    };
    return await this.updateUser(updateUserDataInput);

  }
}