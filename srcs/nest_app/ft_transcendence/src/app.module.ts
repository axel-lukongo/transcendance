import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MessagesModule } from './messages/messages.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { ChanelModule } from './chanel/chanel.module';

@Module({
  imports: [UserModule, MessagesModule, ChanelModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
