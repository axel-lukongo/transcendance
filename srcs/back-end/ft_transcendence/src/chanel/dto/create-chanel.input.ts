import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateChanelInput {
//   @Field(() => Int, { description: 'Example field (placeholder)' })
  @Field(() => Int, {nullable: true})
  owner_id: number;
  
  @Field(() => String, {nullable: true})
  chanel_name: string;

  @Field(() => Int, {nullable: true})
  chanel_size: number;

  @Field(() => Int, {nullable: true})
  max_users: number;

  @Field(() => String, {nullable: true})
  logo: string;
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