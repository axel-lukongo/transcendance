import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreatePongInput } from './create-pong.input';

@InputType()
export class UpdatePongInput extends PartialType(CreatePongInput) {
  @Field(() => Int)
  id: number;

  @Field(() => Int,  {nullable: true})
  scoreUser1?: number 

  @Field(() => Int,  {nullable: true})
  scoreUser2?: number 

  @Field(() => Int,  {nullable: true})
  loserId? : number 

  @Field(() => Int, {nullable: true})
  winnerId?: number
	
  @Field(() => Boolean, {nullable: true})
	start?: boolean;

}
