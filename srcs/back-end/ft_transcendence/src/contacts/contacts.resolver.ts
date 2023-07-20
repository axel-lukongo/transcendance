import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Mutation, Query, Args, Int } from '@nestjs/graphql';
import { Contact } from './entities/contact.entity';
import { ContactsService } from './contacts.service'
import { CreateContactInput } from './dto/create-contact.input';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { UpdateContact } from './dto/update-contact.input';
import { response } from 'express';

@Resolver(() => Contact)
export class ContactsResolver {

	constructor(private readonly contactService: ContactsService,
				private readonly userService: UsersService) {}
	
	@Mutation(() => Contact, {name: "createContact"})
	async createContact(@Args("createContact") createContact: CreateContactInput) {

		if (createContact.user_id == createContact.contact_id)
		  throw new Error("Can't add your self");
		
		try {
			const response = await this.contactService.checkExist(createContact)
			if (response)
				throw new Error("impossible");
			else
				return this.contactService.createContact(createContact);
		}
		catch (error) {
			return error;
		}
	}
  
	@Query(() => [Contact], {name: 'contactsRequest'})
	findAllContactsRequest(@Args("user_id", {type: () => Int}) id: number) {
	  return this.contactService.findAllContactsRequest(id);
	}
  
	@ResolveField(() => User, {name: "contact"})
	findContact(@Parent() contact: Contact, @Args("user_id", {type: () => Int}) user: number) {
		const {contact_id, user_id} = contact;
		let id = user_id;

		if (user == user_id)
			id = contact_id; 

		return this.userService.findUserById(id);
	}

	@Mutation(() => Contact, {name: "replyAddContact"}) 
	replyInviteContact(@Args("reply") reply: UpdateContact) {
		return (this.contactService.replyAddContact(reply));
	}

	@Mutation(() => Contact, {name: "deleteContact"})
	deleteContact(@Args("id", {type: () => Int }) contact_id: number) {
		return (this.contactService.delete(contact_id));
	}

	@Query( ()=> [Contact], {name: "myContacts"} )
	getMyContacts(@Args("user_id", {type: () => Int}) user_id: number) {
		return this.contactService.findContacts(user_id);
	}
}
