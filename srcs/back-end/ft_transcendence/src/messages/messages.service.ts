import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateMessageInput } from './dto/create-messages.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { Message } from './entities/messages.entity';


@Injectable()
export class MessagesService {
	constructor(private readonly prisma: PrismaService) {}


	async findAll_msg() { 
		return this.prisma.message.findMany({});
	}

	async findOne_msg(id: number) {
		return this.prisma.message.findUnique({where: {id: id}});
	}

	async findAll_msg_chan(channelId: number) {
		return this.prisma.message.findMany({
		  where: {
			//il faudra peut etre que on rajoute un filtre pour ne pas retourner les message des personne bloquer par ce user
			channel_id: channelId // Utilisation de la variable channelId pour filtrer les messages
		  }
		});
	  }

	create(createMsg: CreateMessageInput) {
		return this.prisma.message.create({ data: createMsg });
	}

	update(id: number, updateMsg: UpdateMessageInput) {
		return this.prisma.message.update({ 
			where: {id: id},
			data: updateMsg,
		 });
	}

	delete(id: number) {
		return this.prisma.message.delete({ where: { id: id } });
	}


	async isUserMutedInChannel(userId: number, channelId: number): Promise<boolean>{
		const userChannel = await this.prisma.users_Chanels.findFirst({
		  where: {
			user_id: userId,
			chanel_id: channelId,
			pending: false, // Vérifier si l'utilisateur est approuvé dans le canal
		  },
		});
	
		// console.log('dans le service:  ====>>>>  ',userChannel)
		if(userChannel?.is_muted === true){
			return true;
		}
		else{
			return false;
		} // Vérifier si l'utilisateur est en mode "muted"
	}

}
