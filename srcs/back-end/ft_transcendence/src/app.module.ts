// import { Module } from '@nestjs/common';
// import { GraphQLModule } from '@nestjs/graphql';
// import { join } from 'path';
// import { ApolloDriver } from '@nestjs/apollo';
// import { UsersModule } from './users/users.module';
// import { ChanelModule } from './chanel/chanel.module';
// import { MessagesModule } from './messages/messages.module';
// import { ContactsModule } from './contacts/contacts.module';
// import { UserChanelsModule } from './user-chanels/user-chanels.module';

// @Module({
// 	imports: [
// 		GraphQLModule.forRoot({
// 			autoSchemaFile: join(process.cwd(), 'src/schemas.gql'),
// 			driver: ApolloDriver,
// 			playground: true,
// 			installSubscriptionHandlers: true, 

// 		}),
// 		UsersModule,
// 		ChanelModule,
// 		MessagesModule,
// 		ContactsModule,
// 		UserChanelsModule
// 	],
// })
// export class AppModule {}


import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { ChanelModule } from './chanel/chanel.module';
import { MessagesModule } from './messages/messages.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ContactsModule } from './contacts/contacts.module';
import 	{AuthMiddleware} from './utils/auth.utils'
import { join } from 'path';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
	imports: [
		GraphQLModule.forRootAsync<ApolloDriverConfig>({
			driver: ApolloDriver,
			useFactory: () =>({
				autoSchemaFile: join(process.cwd(), 'src/schemas.gql'),
				playground: true,
				context: ({ req, res }) => ({ req, res }),
				installSubscriptionHandlers: true, 
			})
        }),
		UsersModule,
		ChanelModule,
		MessagesModule,
		ContactsModule,
		AuthenticationModule
	],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
	  consumer
		.apply(AuthMiddleware)
		.forRoutes({ path: '*', method: RequestMethod.ALL });
	}
  }