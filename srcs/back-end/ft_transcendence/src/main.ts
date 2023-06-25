

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApolloServer } from '@apollo/server';
import { GraphQLSchemaHost } from '@nestjs/graphql';


async function bootstrap() {

  const app = await NestFactory.create(AppModule, { cors: {
    origin: "http://localhost:8080",
    credentials: true
  }
});

await app.init();


const { schema }: GraphQLSchemaHost = app.get(GraphQLSchemaHost);


const server = new ApolloServer({
    schema: schema,
  });
  
  await server.start();
  
  await app.listen(4000);

}

bootstrap();