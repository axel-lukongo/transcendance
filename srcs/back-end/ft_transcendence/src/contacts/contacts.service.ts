import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateContactInput } from './dto/create-contact.input';
// import { }

@Injectable()
export class ContactsService {

	constructor(private readonly prisma: PrismaService) {}

	createContact(createContact: CreateContactInput) {
		return this.prisma.contact.create({ data: createContact });
	}

	findAllContacts(id: number) {
		return this.prisma.contact.findMany({
			where: {
				OR: [
					{ user_id: id }, 
					{ contact_id: id }
				]
		  }
	  })
	}

//   findContact(user_id: number) {
//     return this.prisma.contact.findFirstOrThrow({where: { id: }})
//   }
}
