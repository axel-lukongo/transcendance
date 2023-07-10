
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
import { MailingModule } from './authentication/mailing/mailing.module';

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
		MailingModule,
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