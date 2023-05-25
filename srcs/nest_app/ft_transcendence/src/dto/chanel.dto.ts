import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateChanelDto {

	@IsOptional()
	@IsInt()
	owner_id: number;

	@IsString()
	chanel_name: string;

	@IsInt()
	chanel_size: number;

	@IsInt()
	max_users: number;

	@IsString()
	email: string;
}