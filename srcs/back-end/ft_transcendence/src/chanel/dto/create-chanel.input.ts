import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateChanelInput {
//   @Field(() => Int, { description: 'Example field (placeholder)' })
  @Field()
  owner_id: number;
  @Field()
  chanel_name: string;

  @Field()
  chanel_size: number;

  @Field()
  max_users: number;
}

// model Chanel {
// 	id          Int             @id @default(autoincrement())
// 	owner_id    Int
// 	chanel_name String
// 	chanel_size Int
// 	max_users   Int
// 	owner       User            @relation(fields: [owner_id], references: [id])
// 	users       Users_Chanels[]
// 	messages    Message[]
//   }