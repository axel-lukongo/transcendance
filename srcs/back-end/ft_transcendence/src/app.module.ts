import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver } from '@nestjs/apollo';
import { ChanelService } from './chanel/chanel.service';
import { ChanelResolver } from './chanel/chanel.resolver';
import { PrismaClient } from '@prisma/client';

@Module({
	imports: [
		GraphQLModule.forRoot({
			autoSchemaFile: join(process.cwd(), 'src/schemas.gql'),
			driver: ApolloDriver,
			playground: true,
		}),
	],
	providers: [ChanelService, ChanelResolver, PrismaClient]
})
export class AppModule {}
console.log("\n\n 1================================ \n\n");