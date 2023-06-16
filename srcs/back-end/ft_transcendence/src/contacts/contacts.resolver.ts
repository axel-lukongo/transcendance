import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Mutation, Query, Args, Int } from '@nestjs/graphql';
import { Contact } from './entities/contact.entity';
import { ContactsService } from './contacts.service'
import { CreateContactInput } from './dto/create-contact.input';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Resolver(() => Contact)
export class ContactsResolver {

	constructor(private readonly myService: ContactsService,
				private readonly userService: UsersService) {}
	
	@Mutation(() => Contact, {name: "createContact"})
	createContact(@Args("createContact") createContact: CreateContactInput) {
	  if (createContact.user_id == createContact.contact_id)
		  throw new Error("Can't add your self");
	  return this.myService.createContact(createContact);
	}
  
	@Query(() => [Contact], {name: 'contacts'})
	findAllContacts(@Args("user_id", {type: () => Int}) id: number) {
	  return this.myService.findAllContacts(id);
	}
  
	@ResolveField(() => User, {name: "contact"})
	findContact(@Parent() contact: Contact) {
		const {contact_id} = contact;
		return this.userService.findOne(contact_id);
	}
}
