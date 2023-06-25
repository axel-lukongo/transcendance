import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateContactInput {
	@Field(() => Int)
	user_id: number;

	@Field(() => Int)
	contact_id: number;

	@Field(() => Boolean, {nullable: true})
	pending: boolean;
} 