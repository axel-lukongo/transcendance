
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as express from 'express'
// import * as path from 'path';




async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
    exposedHeaders: 'Content-Disposition',
    maxAge: 86400,
  })

  // app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

  await app.listen(4000);

}

bootstrap();