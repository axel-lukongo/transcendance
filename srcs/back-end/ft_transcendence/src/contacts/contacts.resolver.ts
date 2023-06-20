import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Mutation, Query, Args, Int } from '@nestjs/graphql';
import { Contact } from './entities/contact.entity';
import { ContactsService } from './contacts.service'
import { CreateContactInput } from './dto/create-contact.input';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { UpdateContact } from './dto/update-contact.input';

@Resolver(() => Contact)
export class ContactsResolver {

	constructor(private readonly contactService: ContactsService,
				private readonly userService: UsersService) {}
	
	@Mutation(() => Contact, {name: "createContact"})
	createContact(@Args("createContact") createContact: CreateContactInput) {
	  if (createContact.user_id == createContact.contact_id)
		  throw new Error("Can't add your self");
	  return this.contactService.createContact(createContact);
	}
  
	@Query(() => [Contact], {name: 'contactsRequest'})
	findAllContactsRequest(@Args("user_id", {type: () => Int}) id: number) {
	  return this.contactService.findAllContactsRequest(id);
	}
  
	@ResolveField(() => User, {name: "contact"})
	findContact(@Parent() contact: Contact) {
		// Need to add check for not display is own profil
		const {contact_id} = contact;
		return this.userService.findOneUserById(contact_id);
	}

	@Mutation(() => Contact, {name: "replyAddContact"}) 
	replyInviteContact(@Args("reply") reply: UpdateContact) {
		return (this.contactService.replyAddContact(reply));
	}

	@Mutation(() => Contact, {name: "deleteContact"})
	deleteContact(@Args("id") contact_id: number) {
		return (this.contactService.delete(contact_id));
	}
}
