import { Resolver } from '@nestjs/graphql';
import { Mutation, Query, Args, Int } from '@nestjs/graphql';
import { Contact } from './entities/contact.entity';
import { ContactsService } from './contacts.service'
import { CreateContactInput } from './dto/create-contact.input';

@Resolver()
export class ContactsResolver {

	constructor(private readonly contactService: ContactsService) {}
	
	@Mutation(() => Contact)
	createContact(@Args("createContact") createContact: CreateContactInput) {
	  if (createContact.user_id == createContact.contact_id)
		  throw new Error("Can't add your self");
	  return this.contactService.createContact(createContact);
	}
  
	@Query(() => [Contact], {name: 'contacts'})
	findAllContacts(@Args("id", {type: () => Int}) id: number) {
	  return this.contactService.findAllContacts(id);
	}
  
	// @Query(() => Contact, {name: "contact"})
	// findContact(
	// 	@Args("nickname", { type: () => String}) nickname: string,
	//   @Args("user_id", {type: () => Int}) user_id: number) {
	// 	  return this.contactService.findContact(nickname, user_id);
	// }
}
