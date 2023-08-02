import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateToblocInput {
//   @Field(() => Int, { description: 'Example field (placeholder)' })
//   exampleField: number;
	@Field(() => Int)
	blocker_id: number;
	@Field(() => Int)
	blocked_id: number;
}
