import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { ChanelModule } from './chanel/chanel.module';
import { MessagesModule } from './messages/messages.module';
import { ContactsModule } from './contacts/contacts.module';

@Module({
	imports: [
		GraphQLModule.forRoot({
			autoSchemaFile: join(process.cwd(), 'src/schemas.gql'),
			driver: ApolloDriver,
			playground: true,
		}),
		UsersModule,
		ChanelModule,
		MessagesModule,
		ContactsModule
	],
})
export class AppModule {}