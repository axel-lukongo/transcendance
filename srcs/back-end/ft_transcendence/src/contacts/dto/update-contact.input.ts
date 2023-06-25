import { InputType, Field, PartialType, Int } from "@nestjs/graphql";
import { CreateContactInput } from "./create-contact.input";

@InputType()
export class UpdateContact extends PartialType(CreateContactInput) {
	@Field(() => Int)
	id: number;

	@Field(() => Boolean)
	pending: boolean;
}