import { PartialType, Field, Int, InputType  } from '@nestjs/graphql'
import { CreateMessageInput } from './create-messages.input';

@InputType()
export class UpdateMessageInput extends PartialType(CreateMessageInput) {
	@Field(()=> Int)
	id: number;
} 