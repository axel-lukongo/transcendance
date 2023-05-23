import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MessagesModule } from './messages/messages.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';

@Module({
  imports: [UserModule, MessagesModule],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
