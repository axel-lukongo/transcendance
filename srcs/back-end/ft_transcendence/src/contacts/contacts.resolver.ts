import { Parent, ResolveField, Resolver, Subscription, Context } from '@nestjs/graphql';
import { Mutation, Query, Args, Int } from '@nestjs/graphql';
import { Contact } from './entities/contact.entity';
import { ContactsService } from './contacts.service'
import { CreateContactInput } from './dto/create-contact.input';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { UpdateContact } from './dto/update-contact.input';
import { CHANGE_STATE } from 'src/authentication/authentication.resolver';
import { socket } from 'src/main';
import { resolveCaa } from 'dns';

import { response } from 'express';
import { ToblocService } from 'src/messages/tobloc/tobloc.service';
@Resolver(() => Contact)
export class ContactsResolver {

	constructor(private readonly contactService: ContactsService,
				private readonly userService: UsersService,
				private readonly toblocService: ToblocService
				) {}
	
	@Mutation(() => Contact, { name: "createContact" })
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
  
	@Query(() => [Contact], { name: 'contactsRequest' })
	findAllContactsRequest(@Context() context) {
	  return this.contactService.findContactsRequest(context.req.userId);
	}

	@Query(() => [Contact], { name: "myContactRequest" })
	findMyContactRequest(@Context() context) {
		console.log(context.req.userId);
		return this.contactService.findMyContactRequest(context.req.userId);
	}
  
	@ResolveField(() => User, { name: "contact" })
	findContact(
		@Parent() contact: Contact, 
		@Context() context)
	{
		const {contact_id, user_id} = contact;
		let id = user_id;
		if (context.req.userId == user_id)
			id = contact_id; 

		return this.userService.findUserById(id);
	}

	@Mutation(() => Contact, { name: "replyAddContact" }) 
	replyInviteContact(@Args("reply") reply: UpdateContact) {
		return (this.contactService.replyAddContact(reply));
	}

	@Mutation(() => Contact, { name: "deletecontact" })
	async deletecontact(
		@Args("user1") user1: number,
		@Args("user2") user2: number)
	{
		return (this.contactService.deleteContact(user1, user2));
	}

	@Mutation(() => Contact, { name: "deleteContact" })
	deleteContact(@Args("id", {type: () => Int }) contact_id: number) {
		return (this.contactService.delete(contact_id));
	}

	@Query( ()=> [Contact], { name: "myContacts" } )
	getMyContacts(@Context() context) {
		return this.contactService.findContacts(context.req.userId);
	}

	@Subscription(() => User, {
		name: 'changeState',
		filter: async function (payload, variables, context) {
			try {
				const resolve_payload = await payload;
				console.log('FILTER | resolve_payload: ', resolve_payload)
				if (resolve_payload.changeState.id == context.token.userId)
					return false;
				let user_contact = await this.contactService.findContacts(context.token.userId);
				let need_to_catch = user_contact.some((contact) => (
					contact.user_id === resolve_payload.changeState.id || contact.contact_id === resolve_payload.changeState.id
				))
				return need_to_catch;
			}
			catch(e) {
				console.log('Error: ', e);
				return false;
			}
		}
	})
	changeState(@Context() context) {
		console.log('CONTACT | rec');
		return socket.asyncIterator(CHANGE_STATE);
	}
}
