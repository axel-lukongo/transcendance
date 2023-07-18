import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


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

  // app.use('/uploads', express.static('/ft_transcendence/src/uploads'));

  await app.listen(4000);

}
bootstrap();