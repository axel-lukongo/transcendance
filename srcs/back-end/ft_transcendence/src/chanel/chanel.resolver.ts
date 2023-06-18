import { Resolver, Query, Mutation, Args, ResolveField, Int, Parent} from '@nestjs/graphql';
import { ChanelService } from './chanel.service';
import { Chanel } from './entities/chanel.entity';
import { CreateChanelInput } from './dto/create-chanel.input';
import { UpdateChanelInput } from './dto/update-chanel.input';
import { MessagesResolver } from '../messages/messages.resolver';
import { Message } from 'src/messages/entities/messages.entity';

@Resolver(() => Chanel)
export class ChanelResolver {
  constructor(private readonly chanelService: ChanelService,
	private readonly messagesResolver: MessagesResolver
	) {}

  @Mutation(() => Chanel)
  createChanel(@Args('createChanelInput') createChanelInput: CreateChanelInput) {
    return this.chanelService.create(createChanelInput);
  }

  @Query(() => [Chanel], { name: 'Channel_findAll' })
  findAll() {
    return this.chanelService.findAll();
  }

  @Query(() => Chanel, { name: 'Channel_findOne' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.chanelService.findOne(id);
  }

  @Mutation(() => Chanel, { name: 'Channel_update' })
  updateChanel(@Args('updateChanelInput') _updateArgs: UpdateChanelInput): Promise<Chanel> {
    return this.chanelService.update(_updateArgs.id, _updateArgs);
  }

  @Mutation(() => Chanel)
  removeChanel(@Args('id', { type: () => Int }) id: number) {
    return this.chanelService.remove(id);
  }

  @ResolveField(() => [Message])
  async messages(@Parent() chanel: Chanel) {
    return this.messagesResolver.findAll_msg(); // Utilisez la méthode appropriée pour récupérer les messages associés au canal à partir de MessagesResolver
  }
}
