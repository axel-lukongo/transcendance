import { ChanelService } from './chanel.service';
import { ChanelResolver } from './chanel.resolver';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Global ,Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaModule } from 'src/prisma/prisma.module';

@Global()
@Module({
  imports: [
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   playground: true,
    // }),
	PrismaModule,
  ],
  providers: [ChanelResolver, ChanelService]

})
export class ChanelModule {}