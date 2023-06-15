import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Chanel {

	@Field(() => Int)
	owner_id: number;
	
	@Field({nullable: true})
	chanel_name: string;

	@Field({nullable: true})
	chanel_size: number;

	@Field({nullable: true})
	max_users: number;
  
}


// id          Int             @id @default(autoincrement())
// owner_id    Int
// chanel_name String
// chanel_size Int
// max_users   Int
// owner       User            @relation(fields: [owner_id], references: [id])
// users       Users_Chanels[]
// messages    Message[]