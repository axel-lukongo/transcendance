import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateMessageDto {

	@IsInt()
	@IsNotEmpty()
	id_sender: number;

	@IsInt()
	user_receiver_id: number;
	
	@IsInt()
	chan_receiver_id: number;
	
	@IsNotEmpty()
	@IsString()
	content: string;
	
}

export class UpdateMessageDto extends PartialType(CreateMessageDto) {}