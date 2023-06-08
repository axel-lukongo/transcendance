import { ObjectType, Field, Int } from '@nestjs/graphql'
import { User } from 'src/users/entities/user.entity'
import { Chanel } from 'src/chanel/entities/chanel.entity'

@ObjectType()
export class Message {
	@Field(() => Int)
	id: number;

	@Field()
	content: string;

	@Field(() => Date)
	sent_at: Date;

	@Field(() => User)
	sender: User;

	@Field(() => Int)
	sender_id: number;

	@Field(() => Int, {nullable: true})
	receiver_id?: number;

	@Field(() => Int, {nullable: true})
	channel_id?: number;

	@Field(() => User, {nullable: true})
	receiver?: User;

	@Field(() => Chanel, {nullable: true})
	channel?: Chanel;
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