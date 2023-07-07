import { Module } from '@nestjs/common';
import { MailingService } from './mailing.service';
import { MailingResolver } from './mailing.resolver';

@Module({
  providers: [MailingResolver, MailingService]
})
export class MailingModule {}
