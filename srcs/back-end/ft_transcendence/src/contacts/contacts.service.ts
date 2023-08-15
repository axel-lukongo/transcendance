import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateContactInput } from './dto/create-contact.input';
import { UpdateContact } from './dto/update-contact.input';
import { Contact } from './entities/contact.entity';
// import { }

@Injectable()
export class ContactsService {

	constructor(private readonly prisma: PrismaService) {}

	createContact(createContact: CreateContactInput) {
		return this.prisma.contact.create({ data: createContact });
	}

	delete(contact_id: number) {
		return (this.prisma.contact.delete({where: {id: contact_id}}));
	}

	async deleteContact(user1: number, user2: number): Promise<Contact | null> {
		const the_contact = await this.prisma.contact.findFirst({
			where: {
			  OR: [
				{
					user_id: user1,
					contact_id: user2,
				},
				{
					user_id: user2,
					contact_id: user1,
				},
			  ],
			},
		  });
		if (the_contact){
			return this.prisma.contact.delete({where: {id: the_contact.id}});
		}
		else {
			return null;
		}
	}

	findContactsRequest(id: number) {
		return this.prisma.contact.findMany({
			where: {
				contact_id: id,
				NOT: {
					pending: false
				}
		  }
	  })
	}
	
	findMyContactRequest(id: number) {
		return this.prisma.contact.findMany({
			where: {
				user_id: id,
				NOT: {
					pending: false
				}
		  }
	  })
	}

	replyAddContact(reply: UpdateContact) {
		return this.prisma.contact.update({
			where: {id: reply.id},
			data: reply
		})
	}

	findContacts(user_id: number) {
		return this.prisma.contact.findMany({
			where: {
				OR: [
					{user_id: user_id},
					{contact_id: user_id}
				],
				NOT: {
					pending: true
				}
			}
		})
	}




	checkExist(createContact: CreateContactInput) {
		return this.prisma.contact.findUnique({
			where: {
				user_id_contact_id: {
					user_id: createContact.contact_id,
					contact_id: createContact.user_id
				}
			}
		})
	}
}
