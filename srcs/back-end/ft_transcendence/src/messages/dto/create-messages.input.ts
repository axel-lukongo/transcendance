import { InputType, Field, Int } from '@nestjs/graphql'
import { User } from 'src/users/entities/user.entity';
import { Chanel } from 'src/chanel/entities/chanel.entity';

@InputType()
export class CreateMessageInput {

	@Field()
	content: string;

	@Field(() => Date, {nullable: true})
	sent_at?: Date;

	@Field(() => Int)
	sender_id: number;

	@Field(() => Int, {nullable: true})
	receiver_id?: number;

	@Field(() => Int, {nullable: true})
	channel_id?: number;
}

/*
model Message {
  id               Int      @id @default(autoincrement())
  sender_id        Int
  user_receiver_id Int?
  chan_receiver_id Int?
  content          String
  sent_at          DateTime @default(now())
  sender           User     @relation("Send", fields: [sender_id], references: [id])
  sent_to_user     User?    @relation("Receive", fields: [user_receiver_id], references: [id])
  send_to_chan     Chanel?  @relation(fields: [chan_receiver_id], references: [id])
}
*/