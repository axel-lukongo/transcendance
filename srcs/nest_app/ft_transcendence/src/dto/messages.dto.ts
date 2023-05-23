import { IsInt, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateMessageDto {

	@IsInt()
	@IsNotEmpty()
	sender_id: number;

	@IsOptional()
	@IsInt()
	user_receiver_id: number;
	
	@IsOptional()
	@IsInt()
	chan_receiver_id: number;
	
	@IsNotEmpty()
	@IsString()
	content: string;
	
}

export class UpdateMessageDto extends PartialType(CreateMessageDto) {}