import { InputType, Field, PartialType, Int } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@InputType()
export class UpdateAuthenticationInput extends PartialType(User) {

  @Field()
  nickname: string;

  @Field()
  avatar: string;
}
