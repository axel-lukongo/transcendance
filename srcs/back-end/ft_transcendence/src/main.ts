import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express'
import { PrismaService } from 'prisma/prisma.service';

async function CreateEsseantialTable() {

  const prisma = new PrismaService; 

  // Vérifiez d'abord s'il n'y a pas déjà une instance de WaitingRoom
  const existingWaitingRoom = await prisma.waitingRoom.findUnique({
    where : {id : 1}
  });

  // Si aucune instance de WaitingRoom n'existe, créez-en une
  if (!existingWaitingRoom) {
    const waitingRoom = await prisma.waitingRoom.create({});
    console.log('Created a new WaitingRoom:', waitingRoom);
  }
  // Fermez la connexion Prisma une fois que vous avez terminé
  await prisma.$disconnect();
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization, secret',
    exposedHeaders: 'Content-Disposition',
    maxAge: 86400,
  })

  app.use('/uploads', express.static('/ft_transcendence/src/uploads'));
  await app.listen(4000);
}

async function run() {
  await bootstrap();
  await CreateEsseantialTable();
}

run();