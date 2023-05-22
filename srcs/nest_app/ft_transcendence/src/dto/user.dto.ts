import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsInt()
  token: number;

  @IsString()
  nickname: string;

  @IsOptional()
  @IsString()
  avatar?: string;
}
