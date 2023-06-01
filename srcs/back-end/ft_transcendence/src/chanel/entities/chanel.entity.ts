import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Chanel {
	@Field(type => Int)
	id: number;

	@Field()
	owner_id: number;

	@Field({nullable: true})
	channel_name: string;

	@Field()
	channel_size: number;
}


// id          Int             @id @default(autoincrement())
// owner_id    Int
// chanel_name String
// chanel_size Int
// max_users   Int
// owner       User            @relation(fields: [owner_id], references: [id])
// users       Users_Chanels[]
// messages    Message[]