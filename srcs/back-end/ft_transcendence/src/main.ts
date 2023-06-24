// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   app.enableCors({
//     origin: 'http://localhost:8080',
//   });
  
//   await app.listen(4000);
// }

// bootstrap();

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ApolloServer } from '@apollo/server';
// import { startStandaloneServer } from '@apollo/server/standalone';
// import { GraphQLSchemaHost } from '@nestjs/graphql';


// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.init();
//   const {schema} : GraphQLSchemaHost = app.get(GraphQLSchemaHost);


//   const server = new ApolloServer({
//     schema
//   });
// const { url } = await startStandaloneServer(server, {
//   context: async ({ req }) => ({ token: req.headers.token }),
//   listen: { port: 4000 },
// });

// }

// bootstrap();



import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { GraphQLSchemaHost } from '@nestjs/graphql';
// import { createProxyMiddleware } from 'http-proxy-middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();
  const { schema }: GraphQLSchemaHost = app.get(GraphQLSchemaHost);

  const server = new ApolloServer({
    schema
  });

  await server.start();

  app.enableCors({
    origin: 'http://localhost:8080',
  });

  // Le serveur Nest écoutera sur le port 8080
  // Vous pouvez ajuster le port si nécessaire
  await app.listen(4000);
}

bootstrap();
