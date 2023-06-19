import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { ChanelModule } from './chanel/chanel.module';
import { MessagesModule } from './messages/messages.module';
// import { WebSocketModule } from 'graphql-ws/lib/nestjs';

@Module({
	imports: [
		// WebSocketModule,
		GraphQLModule.forRoot<ApolloDriverConfig>({
			autoSchemaFile: join(process.cwd(), 'src/schemas.gql'),
			driver: ApolloDriver,
			playground: true,
			// subscriptions: {
			// 	'graphql-ws': true
			// },
			installSubscriptionHandlers: true, 
		}),
		UsersModule,
		ChanelModule,
		MessagesModule
	],
})
export class AppModule {}