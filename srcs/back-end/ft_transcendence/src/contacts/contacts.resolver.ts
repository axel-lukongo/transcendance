import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Mutation, Query, Args, Int } from '@nestjs/graphql';
import { Contact } from './entities/contact.entity';
import { ContactsService } from './contacts.service'
import { CreateContactInput } from './dto/create-contact.input';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { UpdateContact } from './dto/update-contact.input';
import { response } from 'express';
import { ToblocService } from 'src/tobloc/tobloc.service';
@Resolver(() => Contact)
export class ContactsResolver {

	constructor(private readonly contactService: ContactsService,
				private readonly userService: UsersService,
				private readonly toblocService: ToblocService
				) {}
	
	@Mutation(() => Contact, {name: "createContact"})
	async createContact(@Args("createContact") createContact: CreateContactInput) {

		if (createContact.user_id == createContact.contact_id)
		  throw new Error("Can't add your self");

		try {
			const response = await this.contactService.checkExist(createContact)

			const blocked = await this.toblocService.YourBloc(createContact.user_id, createContact.contact_id); 

			if (response)
				throw new Error("impossible");
			else if (blocked){
				throw new Error("this user blocked you");
			}
			else
				return this.contactService.createContact(createContact);
		}
		catch (error) {
			return error;
		}
	}
  
	@Query(() => [Contact], {name: 'contactsRequest'})
	findAllContactsRequest(@Args("user_id", {type: () => Int}) id: number) {
	  return this.contactService.findContactsRequest(id);
	}

	@Query(() => [Contact], {name: "myContactRequest"})
	findMyContactRequest(@Args("user_id", {type: () => Int}) user_id: number) {
		return this.contactService.findMyContactRequest(user_id)
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

	@Mutation(() => Contact, {name: "deletecontact"})
	async deletecontact(
	@Args("user1") user1: number,
	@Args("user2") user2: number) {
		return (this.contactService.deleteContact(user1, user2));
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
