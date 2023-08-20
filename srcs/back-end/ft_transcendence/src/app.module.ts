
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { GqlContextType, GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { ChanelModule } from './chanel/chanel.module';
import { MessagesModule } from './messages/messages.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ContactsModule } from './contacts/contacts.module';
import 	{AuthMiddleware} from './middleware/authMiddleware'
import { join } from 'path';
import { AuthenticationModule } from './authentication/authentication.module';
import { MailingModule } from './authentication/mailing/mailing.module';
import { PongModule } from './pong/pong.module';
import { UserChanelsModule } from './user-chanels/user-chanels.module';
import { verify } from 'jsonwebtoken';


// export interface ConnectionParams {
// 	authorization: string;
// }

@Module({
	imports: [
		GraphQLModule.forRootAsync<ApolloDriverConfig>({
			driver: ApolloDriver,
			useFactory: () =>({
				autoSchemaFile: join(process.cwd(), 'src/schemas.gql'),
				playground: true,
				installSubscriptionHandlers: true, 
				context: ({ req, res, payload, connection }) => {
					if (connection)
						return ({context: connection.context}); 
					else
						return ({
							req,
							res,
							payload,
							connection })
				},
				subscriptions: {
					'subscriptions-transport-ws':{
						onConnect: (connecParam, wsocket, context) => {
							const headers = connecParam.headers;
							const decodedToken = verify(headers, process.env.CLIENT_SECRET_BACKEND) as { userId: number };

							return ({
								token: decodedToken,
							})
						}
					}
						
				}
				
			}),
		}),
		MailingModule,
		UsersModule,
		ChanelModule,
		MessagesModule,
		ContactsModule,
		AuthenticationModule,
		PongModule,
		UserChanelsModule,
	],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
		.apply(AuthMiddleware)
		.forRoutes({ path: '*', method: RequestMethod.ALL });
	};
}