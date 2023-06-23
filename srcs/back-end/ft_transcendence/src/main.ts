// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ApolloServer } from 'apollo-server-express';
// import { ExpressAdapter } from '@nestjs/platform-express';
// import * as express from 'express';
// import { ChanelResolver } from './chanel/chanel.resolver';
// import { MessagesResolver } from './messages/messages.resolver';

// const fs = require('fs');

// const schemaPath = '/ft_transcendence/src/schemas.gql';
// const typeDefs = fs.readFileSync(schemaPath, 'utf8');


// async function bootstrap() {
//   const app = express();
//   const adapter = new ExpressAdapter(app);

//   const server = new ApolloServer({
// 	typeDefs,
// 	// resolvers: [],
// 	// Déplacez vos options de configuration d'Apollo Server ici
//     // Par exemple, les résolveurs, les plugins, etc.
//   });

//   await server.start();
//   server.applyMiddleware({ app });

//   const nestApp = await NestFactory.create(AppModule, adapter);
//   nestApp.enableCors({
//     origin: 'http://localhost:8080',
//   });
//   await nestApp.listen(4000);
// }

// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { GraphQLSchemaHost } from '@nestjs/graphql';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();
  const {schema} : GraphQLSchemaHost = app.get(GraphQLSchemaHost);


  const server = new ApolloServer({
    schema
  });
const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => ({ token: req.headers.token }),
  listen: { port: 4000 },
});

}

bootstrap();