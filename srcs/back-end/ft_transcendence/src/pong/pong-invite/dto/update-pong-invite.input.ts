import { CreatePongInviteInput } from './create-pong-invite.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePongInviteInput extends PartialType(CreatePongInviteInput) {
  @Field(() => Int)
  id: number;
}
