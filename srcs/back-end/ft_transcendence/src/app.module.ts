import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { ChanelModule } from './chanel/chanel.module';
import { MessagesModule } from './messages/messages.module';

@Module({
	imports: [
		GraphQLModule.forRoot<ApolloDriverConfig>({
			autoSchemaFile: join(process.cwd(), 'src/schemas.gql'),
			
			driver: ApolloDriver,
			playground: true,
			// resolvers: {
            //     // UsersResolver: [UsersModule],
            //     // ChanelResolver: [ChanelModule],
            //     // ContactsResolver: [ContactsModule],
            //     // MessagesResolver: [MessagesModule],
            //     // UserChanelsResolver: [UserChanelsModule]
            // },
			installSubscriptionHandlers: true, 
		}),
		UsersModule,
		ChanelModule,
		MessagesModule,
	],
})

export class AppModule {}
