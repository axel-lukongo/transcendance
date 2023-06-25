import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateContactInput } from './dto/create-contact.input';
import { UpdateContact } from './dto/update-contact.input';
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

	findAllContactsRequest(id: number) {
		return this.prisma.contact.findMany({
			where: {
				OR: [
					{ user_id: id }, 
					{ contact_id: id }
				],
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
}
