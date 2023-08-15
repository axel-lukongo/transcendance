import { Resolver, Query, Mutation, Args, Int, Context} from '@nestjs/graphql';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { Req } from '@nestjs/common';
import { AuthenticatedRequest } from 'src/middleware/authMiddleware';


@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'findAllUsers' })
  findAllUsers(@Context() context: any) {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'findUserById' })
  findUserById(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findUserById(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }

  @Query(() => [User])
  searchUsers(@Args("research", { type: () => String}) research: string,
  @Args("user_id", {type: () => Int}) user_id: number) {
    return this.usersService.researchUsers(research, user_id);
  }

  @Query(() => [User], {name: "searchUserForChan"})
  searchUserForChanel(@Args("user_id", { type: () => Int }) user_id: number,
  @Args("chanel_id", { type: () => Int }) chanel_id: number) {
    return this.usersService.researchUsersForAddChanel(user_id, chanel_id);
  }
}