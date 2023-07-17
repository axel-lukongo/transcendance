import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { MailingService } from './mailing.service';

@Resolver()
export class MailingResolver {
  constructor(private mailingService: MailingService) {}

  @Mutation(() => Boolean)
  async sendTwoFactorCodeByEmail(@Args('email') email: string, @Args('code') code: string){
    try {
      await this.mailingService.sendMail(email, code);
      return true;
    } 
    catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }
}