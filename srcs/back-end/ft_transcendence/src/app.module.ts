import { Global ,Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
// import { ChanelService } from './chanel/chanel.service';
import {ChanelModule} from './chanel/chanel.module';
import { ApolloDriver } from '@nestjs/apollo';
import { ChanelService } from './chanel/chanel.service';
import { ChanelResolver } from './chanel/chanel.resolver';
import { PrismaClient } from '@prisma/client';

@Module({
	imports: [
		GraphQLModule.forRoot({
			autoSchemaFile: join(process.cwd(), 'src/schemas.gql'),
		}),
		ChanelModule,
	],
	providers: [ChanelService, ChanelResolver, PrismaClient]
})
export class AppModule {}